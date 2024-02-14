from typing import Optional
from models import Forms, CheckboxItem, Input


def viewForm(form: Forms) -> Forms:
    return form.get_form
