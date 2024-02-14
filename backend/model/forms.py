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
        self.checkboxed: List[CheckboxItem] = []
        self.input: Dict[str, Any] = {}
        self.template: Dict[str, Any] = {}

    def add_checkbox_item(self, checkbox_item: CheckboxItem) -> None:
        self.checkboxed.append(checkbox_item)

    def set_input(self, key: str, value: Any) -> None:
        self.input[key] = value

    def create_form(self):
        for checked_item in self.checkboxed:
            if checked_item.value:
                self.template[checked_item.label] = "Checked"
        for key, value in self.input.items():
            self.template[key] = value

    def get_checked(self) -> List[CheckboxItem]:
        return [item for item in self.checkboxed if item.value]

    def get_input(self) -> Dict[str, Any]:
        return self.input

    def get_form(self) -> Dict[str, Any]:
        return self.template
