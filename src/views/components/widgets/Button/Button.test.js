import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './index';

describe('renders Button component', () => {
    it('test render Button', () => {
        const {container} = render(<Button />);
        expect(container.firstChild).toHaveClass("button");
        expect(container.firstChild.textContent).toBe("");
    });
    it('test render Button with some props', () => {
        const props = {
            title: "Test",
            onClick: jest.fn()
        }
        const {container} = render(<Button {...props} />);
        expect(container.firstChild).toHaveClass("button");
        expect(container.firstChild.textContent).toBe("Test");

        userEvent.click(screen.getByText("Test"));
        expect(props.onClick).toHaveBeenCalledTimes(1);
    });
});