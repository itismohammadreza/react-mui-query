import { FormContainer } from "@components/forms/FormContainer";
import AutocompleteElement from "@components/forms/AutocompleteElement";
import TextFieldElement from "@components/forms/TextFieldElement";
import CheckboxButtonGroup from "@components/forms/CheckboxButtonGroup";
import CheckboxElement from "@components/forms/CheckboxElement";
// import DatePickerElement from "@components/forms/DatePickerElement";
// import DateTimePickerElement from "@components/forms/DateTimePickerElement";
// import MobileDatePickerElement from "@components/forms/MobileDatePickerElement";
// import TimePickerElement from "@components/forms/TimePickerElement";
import MultiSelectElement from "@components/forms/MultiSelectElement";
import PasswordElement from "@components/forms/PasswordElement";
import PasswordRepeatElement from "@components/forms/PasswordRepeatElement";
import RadioButtonGroup from "@components/forms/RadioButtonGroup";
import SelectElement from "@components/forms/SelectElement";
import SliderElement from "@components/forms/SliderElement";
import SwitchElement from "@components/forms/SwitchElement";
import TextareaAutosizeElement from "@components/forms/TextareaAutosizeElement";
import ToggleButtonGroupElement from "@components/forms/ToggleButtonGroupElement";

const FormElements = () => <></>;

FormElements.Container = FormContainer;
FormElements.Autocomplete = AutocompleteElement;
FormElements.CheckboxButtonGroup = CheckboxButtonGroup;
FormElements.Checkbox = CheckboxElement;
// TODO: must install @mui/x-date-pickers
// FormElements.DatePicker = DatePickerElement;
// FormElements.DateTimePicker = DateTimePickerElement;
// FormElements.MobileDatePicker = MobileDatePickerElement;
// FormElements.TimePicker = TimePickerElement;
FormElements.MultiSelect = MultiSelectElement;
FormElements.Password = PasswordElement;
FormElements.PasswordRepeat = PasswordRepeatElement;
FormElements.RadioButton = RadioButtonGroup;
FormElements.Select = SelectElement;
FormElements.Slider = SliderElement;
FormElements.Switch = SwitchElement;
FormElements.Textarea = TextareaAutosizeElement;
FormElements.TextField = TextFieldElement;
FormElements.ToggleButtonGroup = ToggleButtonGroupElement;

export { FormElements };
