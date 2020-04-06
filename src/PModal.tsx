import React from "react";
import { Store } from "./modules/Store";
import { Tag, Author } from "./modules/wpParamsReducer";
import { AppState } from "./modules/Store";

import { Dialog, Slide, withStyles, DialogContent } from "@material-ui/core";
import { TransitionProps } from '@material-ui/core/transitions';

import { useStylesFactory } from "./modules/useStylesFactory";
import { Wifi } from "./PModalModules/Wifi";
import { TagModal } from "./PModalModules/TagModal";
import { AuthorModal } from "./PModalModules/AuthorModal";
import { CloseButton } from "./molecules/CloseButton";
import { ColorChart } from "./PModalModules/ColorChart";

const Transition = React.forwardRef<unknown, TransitionProps>(function Transition(props, ref) {
    //@ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

const styles = {
    dialogContent: {
        padding: "0!important",
        
    },
}

type Props = {
    classes: Record<string, string>
    setModal: AppState["setModal"],
    isModalOpen: AppState["isModalOpen"]
    openModal: (name: string) => void,
    closeModal: () => void,
    setParamsAndClose: ({ type, payload }: SetParamsAndClose) => void
}
type SetParamsAndClose = Tag | Author

const PModalContainer = ({presenter}: any) => {
    const classes = useStylesFactory(styles);

    const { dispatchWpParams, appState, dispatchAppState } = React.useContext(Store)
    const setModal = appState.setModal;
    const isModalOpen = appState.isModalOpen
    const openModal = (name: string) => {
        dispatchAppState({ type: "OPEN_MODAL", payload: name });
    }
    const closeModal = () => {
      dispatchAppState({ type: "CLOSE_MODAL" });
    };
    const setParamsAndClose = ({ type, payload }: SetParamsAndClose) => {
        dispatchAppState({ type: "START_LOADING" })
        dispatchWpParams({ type: type, payload: payload })
        dispatchAppState({ type: "CLOSE_MODAL" });
    }

    const props = {
        classes,
        setModal,
        isModalOpen,
        openModal,
        closeModal,
        setParamsAndClose
    };

    return presenter(props)

}

const PModalPresenter = ({
    classes,
    setModal,
    isModalOpen,
    openModal,
    closeModal,
    setParamsAndClose,
}: Props) => {
    // modalは内容、modalStyle内容に応じてDialogのstyleを変える
    let ModalContent = () => <></>
    let modalStyle = null
    const size90 = {
        width: "90vw",
        height: "90vh",
        padding: 0,
        overflow: "hidden",
    }
    const size100 = {
        width: "100vw",
        height: "100vh",
        padding: 0,

    }
    
    switch (setModal) {
        case "colorChart":
            modalStyle = size90      
            ModalContent = () => <ColorChart/>
        break;
        case "tag":

            ModalContent = () => (
              <TagModal
                setParamsAndClose={setParamsAndClose}
                className={classes.tagAuthorRoot}
              />
            );
        break;

        default:
        console.log("エラーだよ、PModal");
    }
    
    // modalStyleの指定がなければデフォルト値をあてる
    let paperStyle: any = modalStyle || {
        width: 500,
        height: 500,
        padding: 30
    }
    paperStyle.maxWidth = "100%"
    paperStyle.maxHeight = "100%"
    paperStyle.margin = 0


    const StyledDialog = withStyles({
        paper: paperStyle
    })(Dialog);

    return (
        <StyledDialog
        open={isModalOpen}
        TransitionComponent={Transition}
        onClose={closeModal}
        maxWidth="xl"
        >
            <CloseButton onClick={closeModal}/>
            <DialogContent className={classes.dialogContent}>
                <ModalContent/>
            </DialogContent>
        </StyledDialog>
    );
};

export const PModal = () => (
    <PModalContainer presenter={(props: Props) => <PModalPresenter {...props} />} />
);
