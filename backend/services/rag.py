import bs4
from langchain import hub
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.vectorstores import Chroma
from langchain_core.output_parsers import StrOutputParser
from langchain_core.runnables import RunnablePassthrough
from langchain_openai import ChatOpenAI, OpenAIEmbeddings
from langchain_community.document_loaders import UnstructuredHTMLLoader


# Load, chunk and index the contents of the blog.
# loader = WebBaseLoader(web_paths=("https://www.paulgraham.com/greatwork.html/",))
loader = UnstructuredHTMLLoader("data/data.html")
docs = loader.load()  ##langchain, load data

text_splitter = RecursiveCharacterTextSplitter(
    chunk_size=1000, chunk_overlap=200
)  ### embeddings
splits = text_splitter.split_documents(docs)
vectorstore = Chroma.from_documents(documents=splits, embedding=OpenAIEmbeddings())

retriever = vectorstore.as_retriever()
prompt = hub.pull("rlm/rag-prompt")
from langchain.chains import RetrievalQA
from langchain.chat_models import ChatOpenAI

llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)  ### model config


def format_docs(docs):
    return "\n\n".join(doc.page_content for doc in docs)


qa_chain = RetrievalQA.from_chain_type(
    llm,
    retriever=vectorstore.as_retriever(search_kwargs={"k": 1}),
    chain_type_kwargs={"prompt": prompt},
)
### default set up, simplest possible RAG
rag_chain = (
    {"context": retriever | format_docs, "question": RunnablePassthrough()}
    | prompt
    | llm
    | StrOutputParser()
)


def process_form(form_data):
    """
    for form data we process it iteratively to answer all the questions in the file
    """
    ## !FixME: fix here, add constraints, use Allen's advice of foreign key
    responses = {}
    for question in form_data.get("input", []):
        prompt = f"Based on the content {question['description']} what is the answer?\nAnswer the question: {question['title']}"
        response = qa_chain({"query": prompt})["result"]
        responses[question["title"]] = {
            "description": question["description"],
            "response": response,
        }

    # Process "radio" type questions
    radio_responses = []
    for question in form_data.get("radio", []):
        prompt = f"Based on the content {question['question']} being asked, the options available are {question['options']} and the selected option is {question['selectedOption']} what is the right answer?\nAnswer the question only using options from: {question['options']}, do not answer any options outside of these options. If not applicable, respond with any one from the list. Return only the option you choose."
        response = qa_chain({"query": prompt})["result"]
        if response.endswith("."):
            response = response[:-1]
        # Assuming response is one of the options or a new option
        updated_options = (
            question["options"]
            if response in question["options"]
            else question["options"] + [response]
        )
        radio_responses.append(
            {
                "question": question["question"],
                "options": updated_options,
                "selectedOption": response,
            }
        )
    # Process "checkbox" type questions
    checkbox_responses = []
    for question in form_data.get("checkbox", []):
        prompt = f"Based on the question: {question['question']} with the total options {question['options']}, which ones are the right answers?\nAnswer the question only using options from {question['options']}, do not answer any options outside of these options. Do not answer in a sentence, answer only options seperated with a comma and end with a comma. Example: Knowldge, Business, /End of example.If not applicable, respond with any one from the list. Return only the options you choose."
        response = qa_chain({"query": prompt})["result"]
        response = [
            option.strip() for option in response.split(",")
        ]  # Split and trim each option

        updated_options = question["options"]
        selected_options = []

        for option in response:
            if (
                option and option not in updated_options
            ):  # Check if option is not already in the list
                updated_options.append(option)
            if option:  # Add to selected options if it's a valid, non-empty string
                selected_options.append(option)

        checkbox_responses.append(
            {
                "question": question["question"],
                "options": updated_options,  # Use the updated options list
                "selectedOptions": selected_options,
            }
        )

    # Combine processed questions into a single response structure
    final_responses = {
        "input": responses,
        "radio": radio_responses,
        "checkbox": checkbox_responses,
    }
    return final_responses
