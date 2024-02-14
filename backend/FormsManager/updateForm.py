from typing import Optional
from model import Forms, CheckboxItem, Input


def updateForm(
    form: Forms, checkbox_update: Optional[CheckboxItem], input: Optional[Input]
) -> Forms:
    if checkbox_update:
        form.update_checkbox_item(checkbox_item=checkbox_update)
    if input:
        form.update_input_item(input_item=input)

    return form.get_form
