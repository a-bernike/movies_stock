import { render, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TextInput from './index';

describe('renders TextInput component', () => {
    it('test render TextInput', () => {
        const {container} = render(<TextInput />);
        expect(container.firstChild).toHaveClass("text-input");
        expect(container.firstChild).toHaveAttribute("type", "text");
    });
    it('test render TextInput with some props', () => {
        const props = {
            type: "number",
            value: 1,
            placeholder: "type here",
            onChange: jest.fn(),
            onFocus: jest.fn(),
            onBlur: jest.fn()
        }
        const {container} = render(<TextInput {...props} />);
        expect(container.firstChild).toHaveClass("text-input");
        expect(container.firstChild).toHaveAttribute("type", "number");
        expect(container.firstChild).toHaveAttribute("value", "1");
        expect(container.firstChild).toHaveAttribute("placeholder", "type here");

        fireEvent.change(container.firstChild, {
            target: {value: 2}
        })
        expect(props.onChange).toHaveBeenCalledTimes(1);
        userEvent.click(container.firstChild);
        expect(props.onFocus).toHaveBeenCalledTimes(1);
        fireEvent.blur(container.firstChild);
        expect(props.onBlur).toHaveBeenCalledTimes(1);
    });
});