from dataclasses import dataclass, field
from typing import List, Dict, Any


@dataclass
class Input:
    title: str
    description: str


@dataclass
class CheckboxItem:
    label: str
    value: bool = False


class Forms:
    def __init__(self) -> None:
        self.formId = None
        self.checkboxed: Dict[str, bool] = {}
        self.input: Dict[str, Any] = {}
        self.template: Dict[str, Any] = {}

    def add_checkbox_item(self, checkbox_item: CheckboxItem) -> None:
        self.checkboxed[checkbox_item.label] = checkbox_item.value

    def update_checkbox_item(self, checkbox_item: CheckboxItem) -> Dict:
        key, val = checkbox_item.label, checkbox_item.value
        self.checkboxed[key] = val

    def update_input_item(self, input_item: Input) -> Dict:
        key, val = input_item.title, input_item.description
        self.checkboxed[key] = val

    def set_input(self, key: str, value: Any) -> None:
        self.input[key] = value

    def create_form(self):
        for checked_item in self.checkboxed:
            if checked_item.value:
                self.template[checked_item.label] = "Checked"
        for key, value in self.input.items():
            self.template[key] = value
        return self.template

    def get_checked(self) -> List[CheckboxItem]:
        return [item for item, value in self.checkboxed.items() if value]

    def get_input(self) -> Dict[str, Any]:
        return self.input

    def get_form(self) -> Dict[str, Any]:
        return self.template
