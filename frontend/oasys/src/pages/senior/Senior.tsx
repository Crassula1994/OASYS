/* Import */
import { AttendantAnimation, WaveAnimation } from "@components/common/animation";
import Footer from "@components/common/footer";
import Numpad from "@components/numpad";
import postMessage from "@api/notification";
import { postQuestion, postConfirm } from "@api/voice";
import styled from "@emotion/styled";
import { TextArea } from "@components/common/input";
import { useState, useEffect } from "react";
import { useSpeechRecognition } from "react-speech-kit";
import { useUserStore } from "@/store";
import useRouter from "@hooks/useRouter";

// ----------------------------------------------------------------------------------------------------

/* Style */
const SeniorContainer = styled("div")`
    // Position Attribute
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    // Size Attribute
    height: 100vh;
    overflow: hidden;

    // Style Attribute
    background-color: ${(props) => props.theme.colors.gray1};

    // Interaction Attribute
    user-select: none;
`;

const SeniorBodyContainer = styled("div")`
    // Position Attribute
    display: flex;
    justify-content: left;
    align-items: center;

    // Size Attribute
    width: 100%;
`;

// ----------------------------------------------------------------------------------------------------
/* eslint-disable prefer-template */
/* eslint-disable object-shorthand */
/* eslint-disable consistent-return */
/* eslint-disable prefer-destructuring */
/* eslint-disable react-hooks/exhaustive-deps */
/* Senior Page */
let work = "";
let teller = "";
let name = "";
let phone = "";

function Senior() {
    const [value, setValue] = useState<string>("");
    const [confirm, setConfirm] = useState<boolean>(false);
    const [isRecording, setIsRecording] = useState<boolean>(false);
    const [lastSpeechTime, setLastSpeechTime] = useState<number | null>(null);
    const [phase, setPhase] = useState<string>("talk");
    const gender = useUserStore((state) => state.gender);
    const { routeTo } = useRouter();
    name = useUserStore((state) => state.member.name);
    phone = useUserStore((state) => state.member.phone);

    async function sendTextMessage() {
        await postMessage({
            responseFunc: {
                200: () => {},
                400: () => {},
            },
            data: {
                name: name,
                phone: phone,
                teller: teller,
                waitPeople: 3,
                work: work,
            },
        });
    }

    const sendConsumerToWaiting = async (data) => {
        console.log(data);
        try {
            const response = await fetch("/manager/consumer/waiting", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                console.log("response not ok!");
                throw new Error("Failed to add consumer to waiting list");
            }
        } catch (error) {
            console.error("Error sending consumer data:", error);
            console.log("error!");
        }
    };

    const { listen, stop } = useSpeechRecognition({
        onResult: (result) => {
            setValue(result);
            setLastSpeechTime(Date.now());
        },
    });

    // 비회원 번호 입력 확인 추가
    useEffect(() => {
        if (phone) {
            setPhase("talk");
            setValue(
                `대기열 정보를\n휴대전화를 통해\n알려드리겠습니다.\n이용해 주셔서 감사합니다.`,
            );
            const genderKR = gender === "FEMALE" ? "남자" : "여자";
            const resultVoice = new Audio(`../src/assets/sounds/알림_인사_${genderKR}.mp3`);
            resultVoice.play();
            sendTextMessage();

            // Construct the member data to be sent
            const memberData = {
                isMember: false, // Adjust this based on your logic
                userId: null,
                faceId: "test15",
                subId: "test15",
                phone: "00000000000",
                name: "K",
                tellerTypeId: 1,
                cateTypeName: "통장 · 계좌",
            };

            // Call the function to send data to the backend
            sendConsumerToWaiting(memberData);

            setTimeout(() => {
                useUserStore.persist.clearStorage();
                routeTo("/home");
            }, 10000);
        }
    }, [phone]);

    // 고객 응대 기능 추가
    useEffect(() => {
        let welcomeAudioWoman;
        let welcomeAudioMan;
        let waitTime;

        if (name === null) {
            welcomeAudioWoman = new Audio("../src/assets/sounds/업무_응대_확인_여자.mp3");
            welcomeAudioMan = new Audio("../src/assets/sounds/업무_응대_확인_남자.mp3");
            waitTime = 4500;
            setValue(`고객님 안녕하세요!😃`);
            setTimeout(() => {
                setValue(`어떤 업무를 도와드릴까요?`);
            }, 1800);
            if (gender === "FEMALE") {
                welcomeAudioMan.play();
            } else {
                welcomeAudioWoman.play();
            }
        } else {
            welcomeAudioWoman = new Audio("../src/assets/sounds/회원_응대_확인_여자.mp3");
            welcomeAudioMan = new Audio("../src/assets/sounds/회원_응대_확인_남자.mp3");
            waitTime = 7000;
            setValue(`${name}님 안녕하세요!😃`);
            setTimeout(() => {
                setValue(`다시 찾아주셔서 감사해요`);
            }, 1800);
            setTimeout(() => {
                setValue(`어떤 업무를 도와드릴까요?`);
            }, 3800);
            if (gender === "FEMALE") {
                welcomeAudioMan.play();
            } else {
                welcomeAudioWoman.play();
            }
        }

        // 일정 시간 동안 대기 후 고객 음성 인식
        setTimeout(() => {
            listen();
            setIsRecording(true);
        }, waitTime);

        // unmount시 음성 재생 취소
        return () => {
            welcomeAudioWoman.pause();
            welcomeAudioMan.pause();
            welcomeAudioWoman.currentTime = 0;
            welcomeAudioMan.currentTime = 0;
        };
    }, []); // 최초로 한번만 실행

    useEffect(() => {
        async function askBusiness(text: string) {
            await postQuestion({
                responseFunc: {
                    200: (response) => {
                        const receivedText = response?.data;
                        setValue(receivedText.split(" ")[0] + ` 업무가 맞으신가요?`);
                        setConfirm(true);
                        if (receivedText === "") {
                            setConfirm(false);
                        }

                        // 일정 시간 동안 대기 후 고객 음성 인식
                        setTimeout(() => {
                            listen();
                            setIsRecording(true);
                        }, 4000);
                    },
                    400: () => {},
                },
                data: {
                    text,
                    gender,
                },
            });
        }

        async function confirmBusiness(text: string) {
            await postConfirm({
                responseFunc: {
                    200: (response) => {
                        const receivedText = response?.data;
                        work = receivedText.split(" ")[0];
                        teller = receivedText.split(" ")[1];

                        setValue(work + ` 업무가\n접수 완료되었습니다.\n잠시만 기다려주세요.`);

                        if (response?.data) {
                            let resultVoice;
                            const genderKR = gender === "FEMALE" ? "남자" : "여자";

                            setTimeout(() => {
                                setValue(teller + `번 창구 대기열에\n등록되었습니다.`);
                                resultVoice = new Audio(
                                    `../src/assets/sounds/${teller}번창구_안내_${genderKR}.mp3`,
                                );
                                resultVoice.play();
                            }, 8000);

                            if (name !== null) {
                                // 회원일때
                                // /consumer/waiting 으로 보내서 대기 인원 추가하기
                                setTimeout(() => {
                                    setValue(
                                        `대기열 정보를\n휴대전화를 통해\n알려드리겠습니다.\n이용해 주셔서 감사합니다.`,
                                    );
                                    resultVoice = new Audio(
                                        `../src/assets/sounds/알림_인사_${genderKR}.mp3`,
                                    );
                                    resultVoice.play();
                                    sendTextMessage();

                                    // Construct the member data to be sent
                                    const memberData = {
                                        isMember: true, // Adjust this based on your logic
                                        userId: "",
                                        faceId: "",
                                        subId: "",
                                        phone: phone,
                                        name: name,
                                        tellerTypeId: teller,
                                        cateTypeName: work,
                                    };

                                    // Call the function to send data to the backend
                                    sendConsumerToWaiting(memberData);
                                }, 12000);
                            } else {
                                // 회원이 아닐때
                                // /consumer/waiting 으로 보내서 대기 인원 추가하기
                                setTimeout(() => {
                                    setValue(
                                        `문자 및 전화 알림을 원하신다면\n전화번호를 입력해주세요.`,
                                    );
                                    resultVoice = new Audio(
                                        `../src/assets/sounds/전화번호_${genderKR}.mp3`,
                                    );
                                    resultVoice.play();
                                    setPhase("phone");
                                }, 12000);
                            }
                        } else {
                            setConfirm(false);

                            // 일정 시간 동안 대기 후 고객 음성 인식
                            setTimeout(() => {
                                listen();
                                setIsRecording(true);
                            }, 4000);
                        }
                    },
                    400: () => {},
                },
                data: {
                    text,
                    gender,
                },
            });
        }

        if (isRecording && lastSpeechTime) {
            const checkSilenceInterval = setInterval(() => {
                if (Date.now() - lastSpeechTime > 3000) {
                    stop();
                    setIsRecording(false);

                    if (confirm) {
                        confirmBusiness(value);
                    } else {
                        askBusiness(value);
                    }
                    setLastSpeechTime(null);
                }
            }, 1000);

            return () => clearInterval(checkSilenceInterval);
        }
        return () => {};
    }, [confirm, isRecording, lastSpeechTime, stop, value, gender, listen, name]);

    return (
        <SeniorContainer>
            <SeniorBodyContainer>
                <AttendantAnimation isRecording={isRecording} userGender={gender} />
                {phase === "talk" && <TextArea width="100%" value={value} />}
                {phase === "phone" && <Numpad />}
            </SeniorBodyContainer>
            <WaveAnimation />
            <Footer isRecording={isRecording} />
        </SeniorContainer>
    );
}

// ----------------------------------------------------------------------------------------------------

/* Export */
export default Senior;
