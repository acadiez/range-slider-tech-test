interface RangeLabelPropsCommon {
  value: number;
  position?: 'left' | 'right';
}

interface RangeLabelPropsNotEditable extends RangeLabelPropsCommon {
  isEditable?: never;
  onChange?: never;
}

interface RangeLabelPropsEditable extends RangeLabelPropsCommon {
  isEditable: boolean;
  onChange: (value: number) => void;
}

export type RangeLabelProps = RangeLabelPropsNotEditable | RangeLabelPropsEditable;
