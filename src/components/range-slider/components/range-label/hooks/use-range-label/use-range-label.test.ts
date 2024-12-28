import { renderHook, act } from '@testing-library/react';
import { useRangeLabel } from './use-range-label';

const setup = (isEditable = false) => {
  const onChange = jest.fn();

  const { result } = renderHook(() => useRangeLabel({ isEditable, onChange }));

  return { result, onChange };
};

describe('useRangeLabel hook', () => {
  it('should initialize with isEditing as false', () => {
    const { result } = setup();

    expect(result.current.state.isEditing).toBe(false);
  });

  it('should set isEditing to true when handleEdit is called and isEditable is true', () => {
    const { result } = setup(true);

    act(() => {
      result.current.methods.handleEdit();
    });

    expect(result.current.state.isEditing).toBe(true);
  });

  it('should not set isEditing to true when handleEdit is called and isEditable is false', () => {
    const { result } = setup();

    act(() => {
      result.current.methods.handleEdit();
    });

    expect(result.current.state.isEditing).toBe(false);
  });

  it('should call onChange with the correct value when handleChange is called', () => {
    const value = 5;

    const { result, onChange } = setup();

    act(() => {
      result.current.methods.handleChange(value);
    });

    expect(onChange).toHaveBeenCalledWith(value);
  });

  it('should call handleEdit when handleKeyDown is called with Enter key', () => {
    const { result } = setup(true);

    act(() => {
      result.current.methods.handleKeyDown({ key: 'Enter' } as React.KeyboardEvent);
    });

    expect(result.current.state.isEditing).toBe(true);
  });

  it('should not call handleEdit when handleKeyDown is called with a key other than Enter', () => {
    const { result } = setup(true);

    act(() => {
      result.current.methods.handleKeyDown({ key: 'Space' } as React.KeyboardEvent);
    });

    expect(result.current.state.isEditing).toBe(false);
  });
});
