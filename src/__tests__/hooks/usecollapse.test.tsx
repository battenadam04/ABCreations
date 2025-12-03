import { renderHook, act } from '@testing-library/react';
import useCollapse from '~/hooks/useCollapse';

describe('useCollapse hook', () => {
  test('initial state should have activeIndex undefined', () => {
    const { result } = renderHook(() => useCollapse());

    expect(result.current.activeIndex).toBeUndefined();
  });

  test('should set activeIndex when a new index is selected', () => {
    const { result } = renderHook(() => useCollapse());

    act(() => {
      result.current.handleSetIndex(1);
    });

    expect(result.current.activeIndex).toBe(1);
  });

  test('should toggle to new index when selecting a different one', () => {
    const { result } = renderHook(() => useCollapse());

    act(() => {
      result.current.handleSetIndex(1); // sets to 1
    });
    expect(result.current.activeIndex).toBe(1);

    act(() => {
      result.current.handleSetIndex(2); // selecting a different index
    });
    expect(result.current.activeIndex).toBe(2);
  });

  test('should reset activeIndex to undefined when selecting the same index again', () => {
    const { result } = renderHook(() => useCollapse());

    act(() => {
      result.current.handleSetIndex(1);
    });
    expect(result.current.activeIndex).toBe(1);

    act(() => {
      result.current.handleSetIndex(1);
    });
    expect(result.current.activeIndex).toBeUndefined();
  });
});
