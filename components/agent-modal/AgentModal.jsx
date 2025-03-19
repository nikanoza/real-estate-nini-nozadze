"use client";
import React, { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "@/app/GlobalStyles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { agentSchema } from "@/schemas/new-agent-schema"; 

export default function AgentModal({ onClose }) {
  const [image, setImage] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(agentSchema),
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const onSubmit = (data) => {
    console.log("Form Data:", data);
  };

  return (
    <>
      <GlobalStyle />
      <Backdrop>
        <ModalContainer>
          <Agents>აგენტის დამატება</Agents>
            <form onSubmit={handleSubmit(onSubmit)}>
            <InputRow>
              <InputWrapper>
                <Label>სახელი*</Label>
                <Input {...register("firstName")} type="text" />
                <Validation>
                  <TickImg src="/tick.svg" />
                  <span>{errors.firstName ? errors.firstName.message : "მინიმუმ ორი სიმბოლო"}</span>
                </Validation>
              </InputWrapper>

              <InputWrapper>
                <Label>გვარი*</Label>
                <Input {...register("lastName")} type="text" />
                <Validation>
                  <TickImg src="/tick.svg" />
                  <span>{errors.lastName ? errors.lastName.message : "მინიმუმ ორი სიმბოლო"}</span>
                </Validation>
              </InputWrapper>
            </InputRow>

            <InputRow>
              <InputWrapper>
                <Label>ელ-ფოსტა*</Label>
                <Input {...register("email")} type="email" />
                <Validation>
                  <TickImg src="/tick.svg" />
                  <span>{errors.email ? errors.email.message : "გამოიყენეთ @redberry.ge ფოსტა"}</span>
                </Validation>
              </InputWrapper>

              <InputWrapper>
                <Label>ტელეფონის ნომერი*</Label>
                <Input {...register("phone")} type="tel" />
                <Validation>
                  <TickImg src="/tick.svg" />
                  <span>{errors.phone ? errors.phone.message : "მხოლოდ რიცხვები"}</span>
                </Validation>
              </InputWrapper>
            </InputRow>

            <UploadContainer>
              <UploadLabel>ატვირთეთ ფოტო*</UploadLabel>
              <UploadBox onClick={() => document.getElementById("fileInput").click()}>
                {image ? <UploadedImage src={image} alt="Uploaded" /> : <PlusIcon src="/plus-circle.svg" />}
              </UploadBox>
              <HiddenFileInput
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </UploadContainer>

            <ButtonRow>
              <CancelButton onClick={onClose}>გაუქმება</CancelButton>
              <AddButton type="submit">დაამატე აგენტი</AddButton>
            </ButtonRow>
          </form>
        </ModalContainer>
      </Backdrop>
    </>
  );
}


const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContainer = styled.div`
  width: 1009px;
  height: 784px;
  background: white;
  padding: 24px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  align-items: center;
  position:relative;
`;

const Agents = styled.h1`
  margin-top: 65px;
  margin-bottom: 40px;
  font-size: 32px;
  font-weight: bold;
`;

const InputRow = styled.div`
  display: flex;
  gap: 33px;
  margin-top: 12px;
`;

const InputWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 4px;
`;

const Input = styled.input`
  width: 384px;
  height: 42px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 16px;
  padding: 8px;
`;

const Validation = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
  font-size: 12px;
  color: #666;
`;

const TickImg = styled.img`
  width: 16px;
  height: 16px;
`;

const UploadContainer = styled.div`
`;

const UploadLabel = styled.p`
  font-size: 16px;
  font-weight: bold;
  margin-top: 16px;
  margin-bottom: 16px;
`;

const UploadBox = styled.div`
  width: 800px;
  height: 120px;
  border: 2px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 32px;
  cursor: pointer;
  position: relative;
`;

const PlusIcon = styled.img`
  width: 24px;
  height: 24px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const UploadedImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const ButtonRow = styled.div`
display:flex;
  position: absolute;
  bottom: 12%;
  right: 10%;
  gap:14px;
`;

const CancelButton = styled.button`
padding: 10px 20px;
height:47px;
font-size: 16px;
  border: 1px solid #f93b1d;
  background: transparent;
  color: #f93b1d;
  border-radius: 10px;
  cursor: pointer;
`;

const AddButton = styled.button`
width:161px;
height:47px;
padding: 10px 20px;
font-size: 16px;
  background: #f93b1d;
  color: white;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;
