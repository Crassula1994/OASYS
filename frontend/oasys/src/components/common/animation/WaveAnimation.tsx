/* Import */
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { Wave } from "@assets/icons";

// ----------------------------------------------------------------------------------------------------

/* Style */
const waveKeyframes = keyframes`
    0% {
        margin-left: 0;
    }
    100% {
        margin-left: -1600px;
    }
`;

const swellKeyframes = keyframes`
    0%, 100% {
        transform: translate3d(0, -25px, 0);
    }
    50% {
        transform: translate3d(0, 5px, 0);
    }
`;

const WaveContainer = styled("div")`
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 20%;
    background: ${(props) => props.theme.colors.primary0};
`;

const WaveWrapper = styled("div")`
    background: url(${Wave}) repeat-x;
    position: absolute;
    top: -10em;
    width: 6400px;
    height: 100%;
    animation: ${waveKeyframes} 20s cubic-bezier(0.35, 0.45, 0.65, 0.55) infinite;
    transform: translate3d(0, 0, 0);

    &:nth-of-type(2) {
        top: -7em;
        animation:
            ${waveKeyframes} 10s cubic-bezier(0.45, 0.35, 0.55, 0.35) -0.125s infinite,
            ${swellKeyframes} 10s ease -1.25s infinite;
        opacity: 1;
    }

    &:nth-of-type(3) {
        top: -5em;
        animation:
            ${waveKeyframes} 10s cubic-bezier(0.35, 0.5, 0.6, 0.55) -0.2s infinite,
            ${swellKeyframes} 10s ease -2s infinite;
        opacity: 1;
    }
`;

// ----------------------------------------------------------------------------------------------------

/* Wave Animation Component */
function WaveAnimation() {
    return (
        <WaveContainer>
            <WaveWrapper />
            <WaveWrapper />
            <WaveWrapper />
        </WaveContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default WaveAnimation;