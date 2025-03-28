"use client";
import React, { useState } from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import AgentModal from "@/components/agent-modal/AgentModal";
import Link from "next/link";

export default function Home() {
  const [isAgentModalVisible, setIsAgentModalVisible] = useState(false);

  const handleOpenModal = () => {
    setIsAgentModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsAgentModalVisible(false);
  };

  const regions = [
    "ქართლი",
    "კახეთი",
    "იმერეთი",
    "სამეგრელო",
    "გურია",
    "რაჭა",
    "ლეჩხუმი",
    "სამცხე-ჯავახეთი",
    "აჭარა",
    "სვანეთი",
    "მცხეთა-მთიანეთი",
    "თბილისი",
  ];

  const [selectedRegions, setSelectedRegions] = useState([]);
  const [isRegionFilterVisible, setIsRegionFilterVisible] = useState(false);
  const [isPriceFilterVisible, setIsPriceFilterVisible] = useState(false);
  const [selectedMinPrice, setSelectedMinPrice] = useState(null);
  const [selectedMaxPrice, setSelectedMaxPrice] = useState(null);
  const [isAreaFilterVisible, setIsAreaFilterVisible] = useState(false);
  const [selectedMinArea, setSelectedMinArea] = useState("");
  const [selectedMaxArea, setSelectedMaxArea] = useState("");
  const [isBedroomsFilterVisible, setIsBedroomsFilterVisible] = useState(false);
  const [bedrooms, setBedrooms] = useState("");

  const toggleBedroomsFilter = () => {
    setIsBedroomsFilterVisible((prev) => !prev);
  };
  const toggleAreaFilter = () => {
    setIsAreaFilterVisible((prev) => !prev);
  };

  const toggleRegion = (region) => {
    setSelectedRegions((prev) =>
      prev.includes(region)
        ? prev.filter((r) => r !== region)
        : [...prev, region]
    );
  };

  const toggleRegionFilter = () => {
    setIsRegionFilterVisible((prev) => !prev);
  };

  const togglePriceFilter = () => {
    setIsPriceFilterVisible((prev) => !prev);
  };

  return (
    <>
      <GlobalStyle />
      <WholeDiv $ismodalopen={isAgentModalVisible}>
        <div>
          <Header>
            <MainLogo src="/Redberry.svg" alt="Redberry Logo" />
          </Header>
          <FilterWrapper>
            <FilterSection>
              <FilterOptions>
                <RegionFilter onClick={toggleRegionFilter}>
                  რეგიონი{" "}
                  <Arrow
                    src="/arrow.svg"
                    alt="Arrow"
                    $isopen={isRegionFilterVisible}
                  />
                </RegionFilter>
                <PriceFilter onClick={togglePriceFilter}>
                  საფასო კატეგორია{" "}
                  <Arrow
                    src="/arrow.svg"
                    alt="Arrow"
                    $isopen={isPriceFilterVisible}
                  />
                </PriceFilter>
                <Container>
                  <FilterButton onClick={toggleAreaFilter}>
                    ფართობი{" "}
                    <Arrow
                      src="/arrow.svg"
                      alt="Arrow"
                      $isopen={isAreaFilterVisible}
                    />
                  </FilterButton>
                  {isAreaFilterVisible && (
                    <FilterDropdown>
                      <FilterHeading>ფართობის მიხედვით</FilterHeading>
                      <InputsWrapper>
                        <InputContainer>
                          <StyledInput
                            type="number"
                            placeholder="დან"
                            value={selectedMinArea}
                            onChange={(e) => setSelectedMinArea(e.target.value)}
                          />
                          <Label>მინ.მ²</Label>
                          <Options>
                            {[
                              "50,000მ²",
                              "50,000მ²",
                              "50,000მ²",
                              "50,000მ²",
                              "50,000მ²",
                            ].map((area, index) => (
                              <Option
                                key={index}
                                onClick={() => setSelectedMinArea(area)}
                                selected={selectedMinArea === area}
                              >
                                {area}
                              </Option>
                            ))}
                          </Options>
                        </InputContainer>
                        <InputContainer>
                          <StyledInput
                            type="number"
                            placeholder="მდე"
                            value={selectedMaxArea}
                            onChange={(e) => setSelectedMaxArea(e.target.value)}
                          />
                          <Label>მაქს.მ²</Label>
                          <Options>
                            {[
                              "50,000მ²",
                              "50,000მ²",
                              "50,000მ²",
                              "50,000მ²",
                              "50,000მ²",
                            ].map((area, index) => (
                              <Option
                                key={index}
                                onClick={() => setSelectedMaxArea(area)}
                                selected={selectedMaxArea === area}
                              >
                                {area}
                              </Option>
                            ))}
                          </Options>
                        </InputContainer>
                      </InputsWrapper>
                      <ApplyButton>არჩევა</ApplyButton>
                    </FilterDropdown>
                  )}
                </Container>
                <BedroomsFilter onClick={toggleBedroomsFilter}>
                  საძინებლების რაოდენობა{" "}
                  <Arrow
                    src="/arrow.svg"
                    alt="Arrow"
                    $isopen={isBedroomsFilterVisible}
                  />
                </BedroomsFilter>

                {isBedroomsFilterVisible && (
                  <BedroomsFilterDiv>
                    <BedroomsHeading>საძინებლების რაოდენობა</BedroomsHeading>
                    <BedroomsInput
                      type="number"
                      min="1"
                      max="10"
                      value={bedrooms}
                      onChange={(e) => setBedrooms(e.target.value)}
                      placeholder=""
                    />
                    <ChooseButton>არჩევა</ChooseButton>
                  </BedroomsFilterDiv>
                )}
              </FilterOptions>
              <ButtonGroup>
                <Link href="/add-listing">
                  <PrimaryButton>
                    <WhitePlus src="/whitePlus.svg" alt="Plus" />
                    ლისტინგის დამატება
                  </PrimaryButton>
                </Link>

                <SecondaryButton onClick={handleOpenModal}>
                  <OrangePlus src="/orangePlus.svg" alt="Plus" />
                  აგენტის დამატება
                </SecondaryButton>
              </ButtonGroup>
            </FilterSection>
            {isRegionFilterVisible && (
              <RegionFilterDiv>
                <LittleHeading>რეგიონის მიხედვით</LittleHeading>
                <RegionNames>
                  {regions.map((region, index) => (
                    <RegionItem
                      key={index}
                      onClick={() => toggleRegion(region)}
                    >
                      <HiddenCheckbox
                        type="checkbox"
                        checked={selectedRegions.includes(region)}
                        readOnly
                      />
                      <StyledCheckbox
                        checked={selectedRegions.includes(region)}
                      />
                      {region}
                    </RegionItem>
                  ))}
                </RegionNames>
                <SelectRegion>არჩევა</SelectRegion>
              </RegionFilterDiv>
            )}
            {isPriceFilterVisible && (
              <PriceFilterDiv>
                <PriceHeading>ფასის მიხედვით</PriceHeading>
                <JustDiv>
                  <MinInputDiv>
                    <MinInput type="number" placeholder="დან" />
                    <MinPriceLabel>მინ.ფასი</MinPriceLabel>
                    <PriceOptions>
                      {[
                        "50,000ლ",
                        "100,000ლ",
                        "150,000ლ",
                        "200,000ლ",
                        "300,000ლ",
                      ].map((price, index) => (
                        <PriceOption
                          key={index}
                          onClick={() => setSelectedMinPrice(price)}
                          selected={selectedMinPrice === price}
                        >
                          {price}
                        </PriceOption>
                      ))}
                    </PriceOptions>
                  </MinInputDiv>
                  <MaxInputDiv>
                    <MaxInput type="number" placeholder="მდე" />
                    <MaxPriceLabel>მაქს.ფასი</MaxPriceLabel>
                    <PriceOptionss>
                      {[
                        "50,000ლ",
                        "100,000ლ",
                        "150,000ლ",
                        "200,000ლ",
                        "300,000ლ",
                      ].map((price, index) => (
                        <PriceOption
                          key={index}
                          onClick={() => setSelectedMaxPrice(price)}
                          selected={selectedMaxPrice === price}
                        >
                          {price}
                        </PriceOption>
                      ))}
                    </PriceOptionss>
                  </MaxInputDiv>
                </JustDiv>
                <ChooseBtn>არჩევა</ChooseBtn>
              </PriceFilterDiv>
            )}
          </FilterWrapper>
          <ListingContainer>
            {Array.from({ length: 8 }).map((_, index) => (
              <ListingCard key={index}>
                <ImageWrapper>
                  <TagImgDiv>
                    <TagImg src="/Tag.svg" alt="Tag" />
                  </TagImgDiv>
                  <PropertyImage src="/image.svg" alt="Property" />
                </ImageWrapper>
                <Price>80 000ლ</Price>
                <Location>
                  <LocIcon src="/LocIcon.svg" alt="Location" /> თბილისი,
                  ი.ჭავჭავაძის 53
                </Location>
                <Details>
                  <DetailItem>
                    <Icon src="/bed.svg" alt="Bed" />2
                  </DetailItem>
                  <DetailItem>
                    <Icon src="/Vector.svg" alt="Area" />
                    55მ2
                  </DetailItem>
                  <DetailItem>
                    <Icon src="/index.svg" alt="Index" />
                    0160
                  </DetailItem>
                </Details>
              </ListingCard>
            ))}
          </ListingContainer>
        </div>
      </WholeDiv>
      {isAgentModalVisible && <AgentModal onClose={handleCloseModal} />}
    </>
  );
}

const WholeDiv = styled.div`
  filter: ${({ $ismodalopen }) => ($ismodalopen ? "blur(5px)" : "none")};
`;
const Header = styled.header`
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid #dbdbdb;
`;

const MainLogo = styled.img`
  height: 40px;
`;

const FilterWrapper = styled.div`
  position: relative;
`;

const FilterSection = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 100px auto 80px;
`;

const FilterOptions = styled.div`
  display: flex;
  gap: 42px;
  padding: 12px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
`;

const FilterBase = styled.div`
  font-size: 15px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
`;

const RegionFilter = styled(FilterBase)``;
const PriceFilter = styled(FilterBase)``;
const AreaFilter = styled(FilterBase)``;
const BedroomsFilter = styled(FilterBase)``;

const RegionFilterDiv = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  width: 661px;
  height: 284px;
  background: white;
  border: 1px solid #dbdbdb;
  border-radius: 10px;
  padding: 24px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;
const FilterButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  padding: 10px;
  border-radius: 5px;
`;
const Container = styled.div`
  position: relative;
`;

const FilterDropdown = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  height: 367px;
  width: 357px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 15px;
  z-index: 100;
`;

const FilterHeading = styled.h3`
  font-size: 18px;
  margin-bottom: 10px;
`;

const InputsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
`;

const InputContainer = styled.div`
  width: 45%;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 14px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Label = styled.label`
  font-size: 12px;
  color: gray;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 5px;
`;

const Option = styled.div`
  padding: 5px;
  cursor: pointer;
  background: ${(props) => (props.selected ? "#ddd" : "transparent")};
  &:hover {
    background: #eee;
  }
`;

const ApplyButton = styled.button`
  width: 90px;
  height: 35px;
  background-color: #f93b1d;
  color: white;
  border: none;
  border-radius: 8px;
  position: absolute;
  bottom: 5%;
  right: 6%;
`;
const BedroomsFilterDiv = styled.div`
  width: 250px;
  height: 198px;
  right: 53%;
  position: absolute;
  top: 100%;
  background-color: white;
  border: 1px solid #ccc;
  z-index: 10;
  padding: 16px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const BedroomsHeading = styled.h4`
  font-size: 16px;
  font-weight: bold;
`;

const BedroomsInput = styled.input`
  width: 42px;
  height: 40px;
  padding: 8px;
  margin-top: 16px;
  border-radius: 5px;
  border: 1px solid #ccc;
`;

const LittleHeading = styled.h2``;

const RegionNames = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 30px;
`;

const RegionItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
`;

const HiddenCheckbox = styled.input`
  display: none;
`;

const StyledCheckbox = styled.div`
  width: 18px;
  height: 18px;
  border: 1px solid #dbdbdb;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ checked }) => (checked ? "#28a745" : "transparent")};

  &:after {
    content: "${({ checked }) => (checked ? "✔" : "")}";
    color: white;
    font-size: 14px;
    font-weight: bold;
  }
`;

const SelectRegion = styled.button`
  width: 90px;
  height: 35px;
  background-color: #f93b1d;
  color: white;
  border: none;
  border-radius: 8px;
  position: absolute;
  bottom: 8%;
  left: 78%;
`;
const ChooseBtn = styled.button`
  width: 90px;
  height: 35px;
  background-color: #f93b1d;
  color: white;
  border: none;
  border-radius: 8px;
  position: absolute;
  bottom: 2%;
  left: 71%;
`;
const ChooseButton = styled.button`
  width: 90px;
  height: 35px;
  background-color: #f93b1d;
  color: white;
  border: none;
  border-radius: 8px;
  position: absolute;
  bottom: 9%;
  right: 9%;
`;
const JustDiv = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
`;
const PriceFilterDiv = styled.div`
  position: absolute;
  top: 50px;
  left: 100px;
  width: 382px;
  height: 372px;
  border-radius: 10px;
  padding: 24px;
  border: 2px solid #dbdbdb;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 10;
`;

const PriceHeading = styled.h2`
  font-size: 20px;
  margin-bottom: 11px;
`;

const MinPriceLabel = styled.p`
  font-size: 16px;
  font-weight: bold;
`;

const PriceOptions = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 10px;
`;

const MaxPriceLabel = styled.p`
  font-size: 16px;
  font-weight: bold;
`;
const MaxInputDiv = styled.div``;

const PriceOptionss = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 10px;
`;

const PriceOption = styled.p`
  cursor: pointer;
  padding: 5px;
  background-color: ${({ selected }) => (selected ? "#f93b1d" : "transparent")};
  color: ${({ selected }) => (selected ? "white" : "black")};
  border-radius: 4px;
`;

const MaxInput = styled.input`
  width: 155px;
  height: 42px;
  border-radius: 6px;
  border: 1px solid #808a93;
  padding: 10px;
`;

const MinInputDiv = styled.div``;

const MinInput = styled.input`
  width: 155px;
  height: 42px;
  border-radius: 6px;
  border: 1px solid #808a93;
  padding: 10px;
`;

const Arrow = styled.img`
  width: 12px;
  height: 12px;
  transition: transform 0.3s ease;
  transform: ${({ $isopen }) => ($isopen ? "rotate(180deg)" : "rotate(0deg)")};
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
`;

const PrimaryButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  background-color: #f93b1d;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 18px;
  cursor: pointer;
`;

const SecondaryButton = styled(PrimaryButton)`
  background: transparent;
  border: 1px solid #f93b1d;
  color: #f93b1d;
`;

const WhitePlus = styled.img``;
const OrangePlus = styled.img``;

const ListingContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const ListingCard = styled.div`
  background: white;
  border: 2px solid rgba(2, 21, 38, 0.08);
  border-radius: 18px;
  padding: 16px;
  width: 345px;
  height: 430px;
`;

const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const TagImgDiv = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 2;
`;

const TagImg = styled.img`
  width: 92px;
`;

const PropertyImage = styled.img`
  width: 100%;
  border-radius: 12px;
  position: relative;
  z-index: 1;
`;

const Price = styled.p`
  font-size: 26px;
  color: #021526;
  font-weight: bold;
  margin: 16px 0;
`;

const Location = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
`;

const LocIcon = styled.img`
  width: 16px;
  height: 16px;
`;

const Details = styled.div`
  display: flex;
  gap: 40px;
  font-size: 16px;
  margin-top: 20px;
`;

const DetailItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const Icon = styled.img`
  width: 16px;
  height: 16px;
`;
