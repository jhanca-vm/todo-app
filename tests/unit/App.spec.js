import { render, screen, fireEvent } from '@testing-library/vue';
import App from '@/App.vue';

describe('App', () => {
  it('toggle light and dark mode', async () => {
    render(App);

    const icon = screen.getByLabelText(/dark mode/i);

    await fireEvent.click(icon);

    expect(screen.getByLabelText(/light mode/i)).toBeInTheDocument();

    await fireEvent.click(icon);

    expect(screen.getByLabelText(/dark mode/i)).toBeInTheDocument();
  });
});
