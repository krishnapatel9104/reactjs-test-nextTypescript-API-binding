import * as React from "react";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepConnector, {
    stepConnectorClasses,
} from "@mui/material/StepConnector";
import Image from "next/image";
import { StepIconProps } from "@mui/material/StepIcon";

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 22,
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: "#C4C4C4",
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            backgroundColor: "#111827",
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        height: 3,
        border: 0,
        backgroundColor:
            theme.palette.mode === "dark" ? theme.palette.grey[800] : "#eaeaf0",
        borderRadius: 1,
    },
}));

const ColorlibStepIconRoot = styled("div")<{
    ownerState: { completed?: boolean; active?: boolean };
}>(({ theme, ownerState }) => ({
    zIndex: 1,
    color: "#fff",
    width: 50,
    height: 50,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
}));

function ColorlibStepIcon(props: StepIconProps) {
    const { active, completed, className } = props;

    const icons: { [index: string]: React.ReactElement } = {
        1: active ? (
            <Image
                src={"/images/currentstep.png"}
                height={20}
                width={20}
                alt="icon"
            />
        ) : completed ? (
            <Image
                src={"/images/prevstep.png"}
                alt="icon"
                height={20}
                width={20}
            />
        ) : (
            <Image
                src={"/images/nextstep.png"}
                alt="icon"
                height={20}
                width={20}
            />
        ),
        2: active ? (
            <Image
                src={"/images/currentstep.png"}
                height={20}
                width={20}
                alt="icon"
            />
        ) : completed ? (
            <Image
                src={"/images/prevstep.png"}
                alt="icon"
                height={20}
                width={20}
            />
        ) : (
            <Image
                src={"/images/nextstep.png"}
                alt="icon"
                height={20}
                width={20}
            />
        ),
        3: active ? (
            <Image
                src={"/images/currentstep.png"}
                height={20}
                width={20}
                alt="icon"
            />
        ) : completed ? (
            <Image
                src={"/images/prevstep.png"}
                alt="icon"
                height={20}
                width={20}
            />
        ) : (
            <Image
                src={"/images/nextstep.png"}
                alt="icon"
                height={20}
                width={20}
            />
        ),
    };

    return (
        <ColorlibStepIconRoot
            ownerState={{ completed, active }}
            className={className}
        >
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

const steps = ["Shipping", "Billing", "Confirmation"];

export const StepperComp = (props: { activeStep: number }) => {
    return (
        <Stack sx={{ width: "100%" }} spacing={4}>
            <Stepper
                alternativeLabel
                activeStep={props.activeStep}
                connector={<ColorlibConnector />}
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel StepIconComponent={ColorlibStepIcon}>
                            {label}
                        </StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Stack>
    );
};
