import { useCallback, useState } from 'react';

interface UseRangeLabelProps {
  isEditable?: boolean;
  onChange?: (value: number) => void;
}

export const useRangeLabel = ({ isEditable, onChange }: UseRangeLabelProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = useCallback(() => {
    if (!!isEditable && !!onChange) setIsEditing(true);
  }, [isEditable, onChange]);

  const handleChange = useCallback(
    (value: number) => {
      onChange?.(value);
    },
    [onChange],
  );

  return {
    state: { isEditing },
    methods: { handleEdit, handleChange },
  };
};
