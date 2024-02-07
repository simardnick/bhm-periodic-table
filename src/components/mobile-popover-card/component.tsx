// TODO: this file was copied from Champaign and customized; move this Component to Pawtucket / Halifax
import React, { PropsWithChildren, FunctionComponent } from "react";
import "./styles.scss";
import { Slide, Dialog } from "@material-ui/core";
import clsx from "clsx";
import { useSetBodyModalOpenClass } from "../../hooks/useSetBodyModalOpenClass";

export type MobilePopoverCardDirection = "up" | "down" | "left" | "right";

export interface IMobilePopoverCardProps {
  open: boolean;
  className?: string;
  contentClassName?: string;
  direction?: MobilePopoverCardDirection;
  fullScreen?: boolean;
  headerElement?: JSX.Element | string;
  topLeftButton?: JSX.Element;
  topRightButton?: JSX.Element;
  bottomButton?: JSX.Element;
  onEnter?: () => void;
  onClose?: () => void;
}

export const MobilePopoverCard: FunctionComponent<IMobilePopoverCardProps> = (
  props: PropsWithChildren<IMobilePopoverCardProps>
) => {
  const {
    open,
    onEnter,
    onClose,
    className,
    contentClassName,
    children,
    direction,
    fullScreen,
    headerElement,
    topLeftButton,
    topRightButton,
    bottomButton,
  } = props;

  useSetBodyModalOpenClass(open);

  return (
    <Dialog
      hideBackdrop={false}
      BackdropProps={{
        invisible: false,
      }}
      open={open}
      onEnter={onEnter}
      onClose={onClose}
      TransitionComponent={Slide}
      TransitionProps={{
        // @ts-ignore: Fix the type definition of TransitionProps to include direction.
        direction: direction ?? "up",
      }}
      className={clsx("mobile-popover-card-root", className, {
        "full-screen": fullScreen,
      })}
    >
      <div className="mobile-popover-card-container">
        {headerElement && (
          <div className="mobile-popover-card-header">{headerElement}</div>
        )}
        <div className={clsx("mobile-popover-card-top-button", "left")}>
          {topLeftButton}
        </div>
        <div className={clsx("mobile-popover-card-top-button", "right")}>
          {topRightButton}
        </div>
        <div
          className={clsx(
            "mobile-popover-card-content-container",
            contentClassName
          )}
        >
          {children}
        </div>
        <div className="mobile-popover-card-bottom-button">{bottomButton}</div>
      </div>
    </Dialog>
  );
};
