/* Import */
import { FooterProps } from "@customTypes/componentTypes";
import { MicOn, MicOff } from "@assets/icons";
import styled from "@emotion/styled";

// ----------------------------------------------------------------------------------------------------

/* Style */
const FooterContainer = styled("div")`
    // Position Attribute
    display: flex;
    flex-direction: column;
    align-items: center;
    position: fixed;
    z-index: 10;

    // Size Attribute
    width: 100%;
    bottom: 0;

    // Interaction Attribute
    user-select: none;
`;

const FooterIcon = styled("img")`
    // Size Attribute
    width: 100px;
`;

const FooterTextWrapper = styled("div")<FooterProps>`
    // Position Attribute
    display: flex;
    align-items: center;
    justify-content: center;

    // Size Attribute
    width: 100%;
    height: 2em;

    // Style Attribute
    background-color: ${(props) =>
        props.isRecording ? props.theme.colors.primary3 : props.theme.colors.gray7};
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;

    // Text Attribute
    color: white;
    font-size: 40px;
    font-weight: 700;
`;

// ----------------------------------------------------------------------------------------------------

/* Footer Component */
function Footer(props: FooterProps) {
    const { isRecording } = props;

    return (
        <FooterContainer>
            <FooterIcon src={isRecording ? MicOn : MicOff} />
            <FooterTextWrapper isRecording={isRecording}>
                {isRecording ? "지금 말씀해보세요." : "잠시만 기다려주세요."}
            </FooterTextWrapper>
        </FooterContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Footer;
