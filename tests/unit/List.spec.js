import { render, screen, fireEvent } from '@testing-library/vue';
import List from '@/components/List.vue';

describe('List component', () => {
  it('add new todos to the list', async () => {
    render(List);

    await fireEvent.update(screen.getByRole('textbox'), 'Read for 1 hour');
    await fireEvent.submit(screen.getByRole('form'));

    expect(screen.getByText(/Read for 1 hour/i)).toBeInTheDocument();
  });

  it('mark todos as complete', async () => {
    render(List);

    await fireEvent.update(screen.getByRole('textbox'), '5 minutes meditation');
    await fireEvent.submit(screen.getByRole('form'));

    const item = screen.getByLabelText('5 minutes meditation');

    await fireEvent.click(item);

    expect(item).toBeChecked();
  });

  it('delete todos from the list', async () => {
    render(List);

    await fireEvent.update(screen.getByRole('textbox'), 'Pick up groceries');
    await fireEvent.submit(screen.getByRole('form'));

    const icon = screen.getByLabelText(/delete Pick up groceries/i);

    await fireEvent.click(icon);

    expect(screen.queryByText(/Pick up groceries/i)).not.toBeInTheDocument();
  });
});
