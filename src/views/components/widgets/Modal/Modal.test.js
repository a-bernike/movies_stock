import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Modal from './index';

describe('renders Modal component', () => {
    it('test render Modal', () => {
        const {container} = render(<Modal />);
        expect(container.firstChild).toHaveClass("modal");
        expect(container.firstChild.childNodes[0]).toHaveClass("modal__overlay");
        expect(container.firstChild.childNodes[1]).toHaveClass("modal__wrapper");
        const modalWrapper = container.firstChild.childNodes[1];
        expect(modalWrapper.childNodes[0]).toHaveClass("modal__header");
        expect(container.getElementsByTagName("h2")[0].textContent).toBe("");
        expect(container.getElementsByTagName("button")[0].textContent).toBe("X");
        expect(modalWrapper.childNodes[1]).toHaveClass("modal__body");
        expect(modalWrapper.childNodes[1].textContent).toBe("");
    });
    it('test render Modal with some props', () => {
        const props = {
            title: "Testing",
            close: jest.fn(),
            children: (<p>This is body</p>)
        }
        const {container} = render(<Modal {...props} />);
        expect(container.firstChild).toHaveClass("modal");
        expect(container.firstChild.childNodes[0]).toHaveClass("modal__overlay");
        expect(container.firstChild.childNodes[1]).toHaveClass("modal__wrapper");
        const modalWrapper = container.firstChild.childNodes[1];
        expect(modalWrapper.childNodes[0]).toHaveClass("modal__header");
        expect(container.getElementsByTagName("h2")[0].textContent).toBe("Testing");
        expect(container.getElementsByTagName("button")[0].textContent).toBe("X");
        expect(modalWrapper.childNodes[1]).toHaveClass("modal__body");
        expect(modalWrapper.childNodes[1].textContent).toBe("This is body");

        userEvent.click(container.firstChild.childNodes[0]);
        expect(props.close).toHaveBeenCalledTimes(1);
        userEvent.click(container.getElementsByTagName("button")[0]);
        expect(props.close).toHaveBeenCalledTimes(2);
    });
});