package com.dolfin.oasys.domain.gpt.controller;

import com.dolfin.oasys.domain.gpt.service.GPTService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/v1/voice")
@RequiredArgsConstructor
public class GptController {


    private final GPTService gptService;

    @PostMapping("/test")
    public void testGPT(String question){
        //파인튜닝
        gptService.createFineTuning();
    }

    @PostMapping("/question")
    public ResponseEntity<String> receiveVoiceText(@RequestBody Map<String, Object> requestData) {
        String voiceText = (String)requestData.get("text");
        String gender = (String)requestData.get("gender");
        System.out.println(gender);
        String answerText= "";
        answerText=gptService.taskQuestion(voiceText,gender);

        System.out.println(gptService.getTask());
        return ResponseEntity.ok(answerText);
    }

    @PostMapping("/confirm")
    public ResponseEntity<String> confrimTask(@RequestBody Map<String,Object> requestData){
        String voiceText = (String)requestData.get("text");
        String gender = (String)requestData.get("gender");
        System.out.println(gender);
        String answerText= "";
        answerText = gptService.confirmTask(voiceText,gender);
        System.out.println(gptService.getTask());
        return ResponseEntity.ok(answerText);

    }



}




