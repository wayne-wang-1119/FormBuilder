from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas


def generate_pdf(data, file_path):
    c = canvas.Canvas(file_path, pagesize=letter)
    width, height = letter
    y_position = height - 40  # Start near the top of the page
    c.drawString(30, y_position, "Form Responses")
    y_position -= 20

    for section, items in data.items():  # items will be lists of dictionaries
        c.drawString(30, y_position, f"{section.capitalize()}:")
        y_position -= 10
        for item in items:  # item is each dictionary in the list
            if isinstance(item, dict):  # Ensure item is a dictionary
                if section == "input":
                    # For 'input' section
                    question = item.get("title", "")
                    description = item.get("description", "")
                    y_position -= 10
                    c.drawString(40, y_position, f"Q: {question}")
                    y_position -= 10
                    c.drawString(40, y_position, f"Desc: {description}")
                elif section in ["checkbox", "radio"]:
                    # For 'checkbox' and 'radio' sections
                    question = item.get("question", "")
                    options = item.get("options", [])
                    y_position -= 10
                    c.drawString(40, y_position, f"Q: {question}")
                    y_position -= 10
                    c.drawString(40, y_position, f"Options: {', '.join(options)}")
                    y_position -= 10
                    if section == "checkbox":
                        selectedOptions = item.get("selectedOptions", [])
                        c.drawString(
                            40, y_position, f"Selected: {', '.join(selectedOptions)}"
                        )
                    elif section == "radio":
                        selectedOption = item.get("selectedOption", "")
                        c.drawString(40, y_position, f"Selected: {selectedOption}")
                y_position -= 20
                if y_position < 40:
                    c.showPage()
                    y_position = height - 40
            else:
                # Handle unexpected item types (e.g., strings) if necessary
                print(f"Unexpected item type in {section}: {item}")
    c.save()
