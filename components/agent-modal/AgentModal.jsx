"use client";
import React, { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "@/app/GlobalStyles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { agentSchema } from "@/schemas/new-agent-schema"; 
import { addAgent } from "@/services/agentService";

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
      setImage(file); 
    }
  };

  const onSubmit = async (data) => {
   const formData = new FormData();
    formData.append("name", data.name);
    formData.append("surname", data.surname);
    formData.append("email", data.email);
    formData.append("phone", data.phone);
   formData.append("avatar", image )
    console.log("Submitting formData:", formData);
    try {
      const response = await addAgent(formData);
      console.log("Agent added successfully:", response);
      alert("Agent added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding agent:", error);
      alert("Failed to add agent.");
    }
  };
  
  
  console.log(errors)
  return (
    <>
      <GlobalStyle />
      <Backdrop>
        <ModalContainer>
          <Agents>აგენტის დამატება</Agents>
            <form onSubmit={(e) => {
    e.preventDefault();
    handleSubmit(onSubmit)(e);
  }}>
            <InputRow>
              <InputWrapper>
                <Label>სახელი*</Label>
                <Input {...register("name")} type="text" />
                <Validation>
                {errors.name && <Error>{errors.name.message}</Error>}
                  {!errors.name && (
                    <ValidationWrapper>
                    <TickImg src="/tick.svg" />
                    <span>"მინიმუმ ორი სიმბოლო"</span>  </ValidationWrapper>)}
                   
                </Validation>
              </InputWrapper>

              <InputWrapper>
                <Label>გვარი*</Label>
                <Input {...register("surname")} type="text" />
                <Validation>
                {errors.surname && <Error>{errors.surname.message}</Error>}
                  {!errors.surname && (
                    <ValidationWrapper>
                    <TickImg src="/tick.svg" />
                    <span>"მინიმუმ ორი სიმბოლო"</span>  </ValidationWrapper>)}
                </Validation>
              </InputWrapper>
            </InputRow>

            <InputRow>
              <InputWrapper>
                <Label>ელ-ფოსტა*</Label>
                <Input {...register("email")} type="email" />
                <Validation>
                  {errors.email && <Error>{errors.email.message}</Error>}
                  {!errors.email && (
                    <ValidationWrapper>
                    <TickImg src="/tick.svg" />
                    <span>"გამოიყენეთ @redberry.ge ფოსტა"</span>  </ValidationWrapper>)}
                   
                </Validation>
              </InputWrapper>

              <InputWrapper>
                <Label>ტელეფონის ნომერი*</Label>
                <Input {...register("phone")} type="tel" />
                <Validation>
                {errors.phone && <Error>{errors.phone.message}</Error>}
                  {!errors.phone && (
                    <ValidationWrapper>
                    <TickImg src="/tick.svg" />
                    <span>"მხოლოდ რიცხვები"</span>  </ValidationWrapper>)}
                </Validation>
              </InputWrapper>
            </InputRow>

            <UploadContainer>
    <UploadLabel>ატვირთეთ ფოტო*</UploadLabel>
    <UploadBox onClick={() => document.getElementById("fileInput").click()}>
      {image ? (
        <UploadedImage src={URL.createObjectURL(image)} alt="Uploaded" />
      ) : (
        <PlusIcon src="/plus-circle.svg" />
      )}
      <HiddenFileInput
      id="fileInput"
      type="file"
      accept="image/*"
      onChange={handleImageUpload}
    />
    {errors.avatar && <Error>{errors.avatar.message}</Error>}
    </UploadBox>
    
  </UploadContainer>

            <ButtonRow>
              <CancelButton type="button" onClick={onClose}>გაუქმება</CancelButton>
              <AddButton type="submit"> დაამატე აგენტი</AddButton>
            </ButtonRow>
          </form>
        </ModalContainer>
      </Backdrop>
    </>
   
  );
  
}

const ValidationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
`;


const Error = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;
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
