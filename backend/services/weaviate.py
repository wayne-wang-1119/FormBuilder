# import weaviate
# import os
# from dotenv import load_dotenv
# import weaviate.classes.config as wvcc


# load_dotenv()

# # Set these environment variables
# URL = os.getenv("YOUR_WCS_URL")
# APIKEY = os.getenv("YOUR_WCS_API_KEY")

# # Connect to a WCS instance
# client = weaviate.connect_to_wcs(
#     cluster_url=URL, auth_credentials=weaviate.auth.AuthApiKey(APIKEY)
# )

# class_obj = {
#     "classes": [
#         {
#             "class": "Document",
#             "vectorizer": "text2vec-transformers",
#             "properties": [
#                 {
#                     "name": "content",
#                     "dataType": ["text"],
#                     "description": "The textual content of the document",
#                 }
#             ],
#         }
#     ]
# }

# collection = client.collections.create(
#     name="TestArticle",
#     vectorizer_config=wvcc.Configure.Vectorizer.text2vec_cohere(),
#     generative_config=wvcc.Configure.Generative.openai(),
#     properties=[wvcc.Property(name="title", data_type=wvcc.DataType.TEXT)],
# )
