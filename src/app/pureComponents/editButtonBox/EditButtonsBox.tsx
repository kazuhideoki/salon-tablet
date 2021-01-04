import React from 'react';
import { withStyles, IconButton, Popover } from '@material-ui/core';
import { MoreVert } from '@material-ui/icons';
import { SwitchOrderButton, TSwitchOrderButton } from './SwitchOrderButton';
import { THandleUpdateButton, UpdateButton } from './UpdateButton';
import { DeleteButton, THandleDeleteButton } from './DeleteButton';

type Props = {
  className?: string;
  handleUpdateButton?: THandleUpdateButton;
  handleDeleteButton?: THandleDeleteButton;
  handleSwitchButton?: TSwitchOrderButton;
};

export const StyledIconButtonEditButton = withStyles({
  root: {
    padding: 8,
    margin: '0 4px',
  },
})(IconButton);

export const EditButtonsBox: React.FC<Props> = (props) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const open = Boolean(anchorEl);
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const id = open ? 'edit-buttons-box-popover' : undefined;

  return (
    <>
      <IconButton className={props.className}>
        <IconButton aria-describedby={id} onClick={(e) => handleClick(e)}>
          <MoreVert />
        </IconButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}>
          {props.handleSwitchButton ? (
            <SwitchOrderButton
              {...props.handleSwitchButton}
              handleClose={handleClose}
            />
          ) : null}
          {props.handleUpdateButton ? (
            <UpdateButton
              {...props.handleUpdateButton}
              handleClose={handleClose}
            />
          ) : null}
          {props.handleDeleteButton ? (
            <DeleteButton
              {...props.handleDeleteButton}
              handleClose={handleClose}
            />
          ) : null}
        </Popover>
      </IconButton>
    </>
  );
};