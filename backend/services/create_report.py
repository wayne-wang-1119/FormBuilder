# from reportlab.lib.pagesizes import letter
# from reportlab.pdfgen import canvas


# def generate_pdf(data, file_path):
# c = canvas.Canvas(file_path, pagesize=letter)
# width, height = letter
# y_position = height - 40  # Start near the top of the page
# c.drawString(30, y_position, "Form Responses")
# y_position -= 20

# for section, items in data.items():  # items will be lists of dictionaries
#     c.drawString(30, y_position, f"{section.capitalize()}:")
#     y_position -= 10
#     for item in items:  # item is each dictionary in the list
#         if isinstance(item, dict):  # Ensure item is a dictionary
#             if section == "input":
#                 # For 'input' section
#                 question = item.get("title", "")
#                 description = item.get("description", "")
#                 y_position -= 10
#                 c.drawString(40, y_position, f"Q: {question}")
#                 y_position -= 10
#                 c.drawString(40, y_position, f"Desc: {description}")
#             elif section in ["checkbox", "radio"]:
#                 # For 'checkbox' and 'radio' sections
#                 question = item.get("question", "")
#                 options = item.get("options", [])
#                 y_position -= 10
#                 c.drawString(40, y_position, f"Q: {question}")
#                 y_position -= 10
#                 c.drawString(40, y_position, f"Options: {', '.join(options)}")
#                 y_position -= 10
#                 if section == "checkbox":
#                     selectedOptions = item.get("selectedOptions", [])
#                     c.drawString(
#                         40, y_position, f"Selected: {', '.join(selectedOptions)}"
#                     )
#                 elif section == "radio":
#                     selectedOption = item.get("selectedOption", "")
#                     c.drawString(40, y_position, f"Selected: {selectedOption}")
#             y_position -= 20
#             if y_position < 40:
#                 c.showPage()
#                 y_position = height - 40
#         else:
#             # Handle unexpected item types (e.g., strings) if necessary
#             print(f"Unexpected item type in {section}: {item}")
# c.save()


from reportlab.lib.pagesizes import letter
from reportlab.pdfgen import canvas
from reportlab.lib import colors


def generate_pdf(data, file_path):
    c = canvas.Canvas(file_path, pagesize=letter)
    width, height = letter
    margin = 50  # Added margin for aesthetics
    y_position = height - margin  # Adjusted start position to account for margin
    page_num = 1

    # Header
    def add_header_footer():
        c.setFont("Helvetica-Bold", 12)
        c.drawString(margin, height - 30, "Form Responses Report")
        c.setFont("Helvetica", 10)
        c.drawString(margin, 30, f"Page {page_num}")

    # Check and add new page if needed
    def check_page(y_pos):
        nonlocal y_position, page_num
        if y_pos < margin + 40:  # Adjust threshold for new page
            c.showPage()
            page_num += 1
            y_position = height - margin
            add_header_footer()

    add_header_footer()
    c.setFont("Helvetica", 10)

    for section, items in data.items():
        check_page(y_position - 20)
        c.drawString(margin, y_position, f"{section.capitalize()}:")
        y_position -= 20

        for item in items:
            if isinstance(item, dict):
                # Original handling for dictionary items
                question = item.get("title" if section == "input" else "question", "")
                c.drawString(margin + 10, y_position, f"Q: {question}")
                y_position -= 15

                if section == "input":
                    description = item.get("response", "")
                    c.drawString(margin + 10, y_position, f"Desc: {description}")
                else:
                    options = item.get("options", [])
                    c.drawString(
                        margin + 10, y_position, f"Options: {', '.join(options)}"
                    )
                    if section == "checkbox":
                        selectedOptions = item.get("selectedOptions", [])
                        y_position -= 15
                        c.drawString(
                            margin + 10,
                            y_position,
                            f"Selected: {', '.join(selectedOptions)}",
                        )
                    elif section == "radio":
                        selectedOption = item.get("selectedOption", "")
                        y_position -= 15
                        c.drawString(
                            margin + 10, y_position, f"Selected: {selectedOption}"
                        )
                y_position -= 20  # Additional space before next section
            elif isinstance(item, str):
                # New handling for string items
                c.drawString(margin + 10, y_position, f"Q: {item}")
                y_position -= 20  # Adjust as needed
            else:
                print(f"Unexpected item type in {section}: {item}")
            check_page(y_position)

    c.save()
