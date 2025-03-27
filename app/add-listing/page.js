"use client";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { addListingSchema } from "@/schemas/new-listing-schema";
import React from "react";
import styled from "styled-components";
import GlobalStyle from "../GlobalStyles";
import AgentModal from "@/components/agent-modal/AgentModal";
import { getAgents } from "@/services/agentService";
import { getRegions, getCities } from "@/services/regionCityServices";
import { createRealEstateListing } from "@/services/listingService";
export default function AddListing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [picture, setPicture] = useState(null);
  const [agents, setAgents] = useState([]);
  const [regions, setRegions] = useState([]);
  const [cities, setCities] = useState([]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const agentList = await getAgents();
        setAgents(agentList);
      } catch (err) {
        console.error("Failed to load agents:", err);
      }
    };

    fetchAgents();
  }, []);

  useEffect(() => {
    const fetchLocationData = async () => {
      try {
        const [regionData, cityData] = await Promise.all([
          getRegions(),
          getCities(),
        ]);
        setRegions(regionData);
        setCities(cityData);
      } catch (err) {
        console.error("Error loading region/city data:", err);
      }
    };

    fetchLocationData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: yupResolver(addListingSchema),
  });

  const handlePictureUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setPicture(file);
    }
  };

  const selectedRegionId = watch("region_id");
  const filteredCities = cities.filter(
    (city) => String(city.region_id) === String(selectedRegionId)
  );

  const onSubmit = async (data) => {
    const formData = new FormData();

    formData.append("address", data.address);
    formData.append("region_id", Number(data.region_id));
    formData.append("city_id", +data.city_id);
    formData.append("zip_code", data.zip_code);
    formData.append("price", data.price);
    formData.append("area", data.area);
    formData.append("bedrooms", data.bedrooms);
    formData.append("description", data.description);
    formData.append("is_rental", +data.is_rental);
    formData.append("agent_id", data.agent_id);
    formData.append("image", picture);
    try {
      const response = await createRealEstateListing(formData);
      console.log("Listing successfully created!", response);
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ContainerDiv $isModalOpen={isModalOpen}>
        <GlobalStyle />
        <AddListingHeader>ლისტინგის დამატება</AddListingHeader>
        <FormsDiv onSubmit={handleSubmit(onSubmit)}>
          <DealTypeDiv>
            <Label>გარიგების ტიპი:</Label>
            <DealTypeOptions>
              <label>
                <input type="radio" {...register("is_rental")} value="0" />
                იყიდება
              </label>
              <label>
                <input type="radio" {...register("is_rental")} value="1" />
                ქირავდება
              </label>
            </DealTypeOptions>
            {errors.is_rental && <Error>{errors.is_rental.message}</Error>}
          </DealTypeDiv>

          <SectionHeader>მდებარეობა</SectionHeader>
          <LocationGrid>
            <InputWrapper>
              <Label>მისამართი*</Label>
              <Input {...register("address")} />
              {errors.address && <Error>{errors.address.message}</Error>}
              {!errors.address && (
                <ValidationWrapper>
                  <TickImg src="/tick.svg" />
                  <SymbolsQuantity>მინიმუმ ორი სიმბოლო</SymbolsQuantity>
                </ValidationWrapper>
              )}
            </InputWrapper>
            <InputWrapper>
              <Label>საფოსტო ინდექსი*</Label>
              <Input {...register("zip_code")} />
              {errors.zip_code && <Error>{errors.zip_code.message}</Error>}
              {!errors.zip_code && (
                <ValidationWrapper>
                  <TickImg src="/tick.svg" />
                  <SymbolsQuantity>მხოლოდ რიცხვები</SymbolsQuantity>
                </ValidationWrapper>
              )}
            </InputWrapper>
            <InputWrapper>
              <Label>რეგიონი</Label>
              <Select {...register("region_id")}>
                <option value="">აირჩიეთ რეგიონი</option>
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </Select>
              {errors.region_id && <Error>{errors.region_id.message}</Error>}
            </InputWrapper>

            <InputWrapper>
              <Label>ქალაქი</Label>
              <Select {...register("city_id")}>
                <option value="">აირჩიეთ ქალაქი</option>
                {filteredCities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}
                  </option>
                ))}
              </Select>

              {errors.city_id && <Error>{errors.city_id.message}</Error>}
            </InputWrapper>
          </LocationGrid>
          <SectionHeader>ბინის დეტალები</SectionHeader>
          <HomeDetailsGrid>
            <InputWrapper>
              <Label>ფასი</Label>
              <Input type="number" {...register("price")} />
              {errors.price && <Error>{errors.price.message}</Error>}
              {!errors.price && (
                <ValidationWrapper>
                  <TickImg src="/tick.svg" />
                  <SymbolsQuantity>მხოლოდ რიცხვები</SymbolsQuantity>
                </ValidationWrapper>
              )}
            </InputWrapper>

            <InputWrapper>
              <Label>ფართი (მ²)</Label>
              <Input type="number" {...register("area")} />
              {errors.area && <Error>{errors.area.message}</Error>}
              {!errors.area && (
                <ValidationWrapper>
                  <TickImg src="/tick.svg" />
                  <SymbolsQuantity>მხოლოდ რიცხვები</SymbolsQuantity>
                </ValidationWrapper>
              )}
            </InputWrapper>
          </HomeDetailsGrid>

          <InputWrapper>
            <Label>საძინებლების რაოდენობა*</Label>
            <Input type="number" {...register("bedrooms")} />
            {errors.bedrooms && <Error>{errors.bedrooms.message}</Error>}
            {!errors.bedrooms && (
              <ValidationWrapper>
                <TickImg src="/tick.svg" />
                <SymbolsQuantity>მხოლოდ რიცხვები</SymbolsQuantity>
              </ValidationWrapper>
            )}
          </InputWrapper>

          <InputWrapper>
            <Label>აღწერა*</Label>
            <Textarea {...register("description")} />
            {errors.description && <Error>{errors.description.message}</Error>}
            {!errors.description && (
              <ValidationWrapper>
                <TickImg src="/tick.svg" />
                <SymbolsQuantity>მინიმუმ ხუთი სიტყვა</SymbolsQuantity>
              </ValidationWrapper>
            )}
          </InputWrapper>
          <InputWrapper>
            <Label>ატვირთეთ ფოტო*</Label>
            <ImageUploadDiv
              onClick={() => document.getElementById("fileInput").click()}
            >
              {picture ? (
                <UploadedPicture
                  src={URL.createObjectURL(picture)}
                  alt="Uploaded"
                />
              ) : (
                <PlusIcon src="/plus-circle.svg" />
              )}
              <ImageUploadInput
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={handlePictureUpload}
              />
            </ImageUploadDiv>
            {errors.picture && <Error>{errors.picture.message}</Error>}
          </InputWrapper>

          <AgentSection>
            <AgentHeader>აგენტი</AgentHeader>
            <SmallHeader>აირჩიე</SmallHeader>
            <AgentTable>
              <tbody>
                <tr>
                  <td>
                    <ChooseAgent {...register("agent_id")}>
                      <option value="">აირჩიე აგენტი</option>
                      {agents.map((agent) => (
                        <option key={agent.id} value={agent.id}>
                          {agent.name} {agent.surname}
                        </option>
                      ))}
                    </ChooseAgent>
                  </td>
                </tr>
                <tr>
                  <td>
                    <IconTextWrapper onClick={handleModalOpen}>
                      <AgentPlusIcon src="/plus-circle.svg" />
                      <span>დაამატე აგენტი</span>
                    </IconTextWrapper>
                  </td>
                </tr>
              </tbody>
            </AgentTable>
          </AgentSection>

          <ButtonContainer>
            <CancelButton type="button">გაუქმება</CancelButton>
            <SubmitButton type="submit">დაამატე ლისტინგი</SubmitButton>
          </ButtonContainer>
        </FormsDiv>
      </ContainerDiv>
      {isModalOpen && <AgentModal onClose={handleModalClose} />}
    </>
  );
}

const Error = styled.p`
  color: red;
  font-size: 12px;
  margin-top: 5px;
`;

const ValidationWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
`;

const TickImg = styled.img`
  width: 14px;
  height: 14px;
`;

const SymbolsQuantity = styled.p`
  font-size: 14px;
  color: gray;
  margin-top: 5px;
`;

const ContainerDiv = styled.div`
  display: grid;
  justify-items: center;
  ${({ $isModalOpen }) => $isModalOpen && `filter: blur(5px);`}
`;
const AddListingHeader = styled.h1``;

const FormsDiv = styled.form`
  width: 790px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const DealTypeDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const Label = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;
  display: block;
`;

const DealTypeOptions = styled.div`
  display: flex;
  gap: 20px;

  label {
    display: flex;
    align-items: center;
    gap: 5px;
    font-size: 16px;
  }

  input {
    transform: scale(1.2);
  }
`;

const SectionHeader = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-top: 50px;
`;

const LocationGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const HomeDetailsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
  resize: vertical;
  height: 100px;
`;

const ImageUploadDiv = styled.div`
  width: 750px;
  height: 120px;
  border: dotted 3px #ccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const PlusIcon = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const ImageUploadInput = styled.input`
  display: none;
`;
const UploadedPicture = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: cover;
`;

const AgentSection = styled.div`
  margin-top: 20px;
`;

const AgentHeader = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const SmallHeader = styled.h4`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const AgentTable = styled.table`
  width: 50%;
  border-collapse: collapse;

  td {
    border: 1px solid #ddd;
    padding: 10px;
    text-align: start;
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  font-size: 16px;
  border: 1px solid #ccc;
`;

const ChooseAgent = styled.select`
  width: 100%;
  border-radius: 5px;
  font-size: 16px;
  border: none;
`;

const IconTextWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const AgentPlusIcon = styled.img`
  width: 20px;
  height: 20px;
  cursor: pointer;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
`;

const CancelButton = styled.button`
  width: 103px;
  height: 47px;
  border: 1px solid #f93b1d;
  padding: 12px;
  background-color: white;
  color: #f93b1d;
  font-size: 16px;
  border-radius: 10px;
  cursor: pointer;
`;

const SubmitButton = styled.button`
  width: 187px;
  padding: 12px;
  background-color: #f93b1d;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
`;
