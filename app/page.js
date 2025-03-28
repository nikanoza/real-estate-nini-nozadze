"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyles";
import AgentModal from "@/components/agent-modal/AgentModal";
import Link from "next/link";
import { getRegions } from "@/services/regionCityServices";
import { getListings } from "@/services/listingService";

export default function Home() {
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
  const [isAgentModalVisible, setIsAgentModalVisible] = useState(false);
  const [regions, setRegions] = useState([]);
  const [listings, setListings] = useState([]);

  const [applyRegionFilter, setApplyRegionFilter] = useState(false);
  const [appliedRegions, setAppliedRegions] = useState([]);

  const [applyPriceFilter, setApplyPriceFilter] = useState(false);
  const [applyAreaFilter, setApplyAreaFilter] = useState(false);
  const [applyBedroomsFilter, setApplyBedroomsFilter] = useState(false);

  const [showAppliedRegionTags, setShowAppliedRegionTags] = useState(false);
  const [showAppliedPriceTag, setShowAppliedPriceTag] = useState(false);
  const [showAppliedBedroomsTag, setShowAppliedBedroomsTag] = useState(false);

  const [showAppliedAreaTag, setShowAppliedAreaTag] = useState(false);
  const [tempMinPrice, setTempMinPrice] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");
  const [tempMinArea, setTempMinArea] = useState("");
  const [tempMaxArea, setTempMaxArea] = useState("");
  const [appliedBedrooms, setAppliedBedrooms] = useState(null);

  const [priceError, setPriceError] = useState("");
  const [areaError, setAreaError] = useState("");

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const regionList = await getRegions();
        setRegions(regionList);
      } catch (err) {
        console.error("Failed to fetch regions:", err);
      }
    };

    fetchRegions();
  }, []);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await getListings();
        setListings(data);
      } catch (err) {
        console.error("Failed to fetch listings:", err);
      }
    };

    fetchListings();
  }, []);

  const cleanValue = (val) =>
    typeof val === "string" ? Number(val.replace(/[^0-9.]/g, "")) : Number(val);

  const filteredListings = listings.filter((listing) => {
    const regionName = listing.city?.region?.name;

    const matchesRegion =
      !applyRegionFilter || appliedRegions.includes(regionName);

    const matchesPrice =
      !applyPriceFilter ||
      ((!selectedMinPrice || listing.price >= cleanValue(selectedMinPrice)) &&
        (!selectedMaxPrice || listing.price <= cleanValue(selectedMaxPrice)));

    const matchesArea =
      !applyAreaFilter ||
      ((!selectedMinArea || listing.area >= cleanValue(selectedMinArea)) &&
        (!selectedMaxArea || listing.area <= cleanValue(selectedMaxArea)));

    const matchesBedrooms =
      !applyBedroomsFilter || listing.bedrooms === Number(appliedBedrooms);

    return matchesRegion && matchesPrice && matchesArea && matchesBedrooms;
  });

  const handleOpenModal = () => {
    setIsAgentModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsAgentModalVisible(false);
  };

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

  const handleRemoveRegion = (regionToRemove) => {
    const updatedSelected = selectedRegions.filter((r) => r !== regionToRemove);
    const updatedApplied = appliedRegions.filter((r) => r !== regionToRemove);

    setSelectedRegions(updatedSelected);
    setAppliedRegions(updatedApplied);

    if (updatedApplied.length === 0) {
      setApplyRegionFilter(false);
      setShowAppliedRegionTags(false);
    }
  };

  const handleRemoveAreaFilter = () => {
    setSelectedMinArea("");
    setSelectedMaxArea("");
    setApplyAreaFilter(false);
    setShowAppliedAreaTag(false);
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
                            value={tempMinArea}
                            onChange={(e) => setTempMinArea(e.target.value)}
                          />
                          <Label>მინ.მ²</Label>
                          <Options>
                            {[50000, 60000, 70000, 80000, 90000].map(
                              (area, index) => (
                                <Option
                                  key={index}
                                  onClick={() => setTempMinArea(area)}
                                  selected={Number(tempMinArea) === area}
                                >
                                  {area.toLocaleString()}მ²
                                </Option>
                              )
                            )}
                          </Options>
                        </InputContainer>
                        <InputContainer>
                          <StyledInput
                            type="number"
                            placeholder="მდე"
                            value={tempMaxArea}
                            onChange={(e) => setTempMaxArea(e.target.value)}
                          />
                          <Label>მაქს.მ²</Label>
                          <Options>
                            {[60000, 70000, 80000, 90000, 100000].map(
                              (area, index) => (
                                <Option
                                  key={index}
                                  onClick={() => setTempMaxArea(area)}
                                  selected={Number(tempMaxArea) === area}
                                >
                                  {area.toLocaleString()}მ²
                                </Option>
                              )
                            )}
                          </Options>
                        </InputContainer>
                      </InputsWrapper>
                      <ApplyButton
                        onClick={() => {
                          const min = cleanValue(tempMinArea);
                          const max = cleanValue(tempMaxArea);

                          if (min && max && min > max) {
                            setAreaError("შეიყვანეთ ვალიდური რიცხვები");
                            return;
                          }

                          setSelectedMinArea(tempMinArea);
                          setSelectedMaxArea(tempMaxArea);
                          setApplyAreaFilter(true);
                          setShowAppliedAreaTag(true);
                          setIsAreaFilterVisible(false);
                          setAreaError("");
                        }}
                      >
                        არჩევა
                      </ApplyButton>
                      {areaError && (
                        <ValidationError>{areaError}</ValidationError>
                      )}
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
                    <ChooseButton
                      onClick={() => {
                        setAppliedBedrooms(bedrooms);
                        setApplyBedroomsFilter(true);
                        setIsBedroomsFilterVisible(false);
                        setShowAppliedBedroomsTag(true);
                      }}
                    >
                      არჩევა
                    </ChooseButton>
                  </BedroomsFilterDiv>
                )}
              </FilterOptions>

              <ButtonGroup>
                <Link style={{ textDecoration: "none" }} href="/add-listing">
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
            {(showAppliedRegionTags ||
              showAppliedPriceTag ||
              showAppliedAreaTag ||
              showAppliedBedroomsTag) && (
              <FilterTagsWrapper>
                <SelectedRegionTags>
                  {showAppliedRegionTags &&
                    selectedRegions.map((region) => (
                      <Tag key={region}>
                        {region}
                        <RemoveIcon onClick={() => handleRemoveRegion(region)}>
                          ×
                        </RemoveIcon>
                      </Tag>
                    ))}

                  {showAppliedPriceTag &&
                    (selectedMinPrice || selectedMaxPrice) && (
                      <Tag>
                        {selectedMinPrice || "მინ"}₾ -{" "}
                        {selectedMaxPrice || "მაქს"}₾
                        <RemoveIcon
                          onClick={() => {
                            setSelectedMinPrice(null);
                            setSelectedMaxPrice(null);
                            setApplyPriceFilter(false);
                            setShowAppliedPriceTag(false);
                          }}
                        >
                          ×
                        </RemoveIcon>
                      </Tag>
                    )}

                  {showAppliedAreaTag &&
                    (selectedMinArea || selectedMaxArea) && (
                      <Tag>
                        {selectedMinArea || "მინ"}მ² -{" "}
                        {selectedMaxArea || "მაქს"}მ²
                        <RemoveIcon
                          onClick={() => {
                            setSelectedMinArea("");
                            setSelectedMaxArea("");
                            setApplyAreaFilter(false);
                            setShowAppliedAreaTag(false);
                          }}
                        >
                          ×
                        </RemoveIcon>
                      </Tag>
                    )}

                  {showAppliedBedroomsTag && appliedBedrooms && (
                    <Tag>
                      {appliedBedrooms} საძინებელი
                      <RemoveIcon
                        onClick={() => {
                          setAppliedBedrooms(null);
                          setApplyBedroomsFilter(false);
                          setShowAppliedBedroomsTag(false);
                        }}
                      >
                        ×
                      </RemoveIcon>
                    </Tag>
                  )}
                </SelectedRegionTags>

                <ClearAll
                  onClick={() => {
                    setSelectedRegions([]);
                    setAppliedRegions([]);
                    setSelectedMinPrice(null);
                    setSelectedMaxPrice(null);
                    setTempMinPrice("");
                    setTempMaxPrice("");
                    setSelectedMinArea("");
                    setSelectedMaxArea("");
                    setTempMinArea("");
                    setTempMaxArea("");
                    setBedrooms("");
                    setAppliedBedrooms(null);

                    setApplyRegionFilter(false);
                    setApplyPriceFilter(false);
                    setApplyAreaFilter(false);
                    setApplyBedroomsFilter(false);

                    setShowAppliedRegionTags(false);
                    setShowAppliedPriceTag(false);
                    setShowAppliedAreaTag(false);
                    setShowAppliedBedroomsTag(false);
                  }}
                >
                  გასუფთავება
                </ClearAll>
              </FilterTagsWrapper>
            )}

            {isRegionFilterVisible && (
              <RegionFilterDiv>
                <LittleHeading>რეგიონის მიხედვით</LittleHeading>
                <RegionNames>
                  {regions.map((region) => (
                    <RegionItem
                      key={region.id}
                      onClick={() => toggleRegion(region.name)}
                    >
                      <HiddenCheckbox
                        type="checkbox"
                        checked={selectedRegions.includes(region.name)}
                        readOnly
                      />
                      <StyledCheckbox
                        checked={selectedRegions.includes(region.name)}
                      />
                      {region.name}
                    </RegionItem>
                  ))}
                </RegionNames>
                <SelectRegion
                  onClick={() => {
                    setAppliedRegions([...selectedRegions]);
                    setApplyRegionFilter(true);
                    setIsRegionFilterVisible(false);
                    setShowAppliedRegionTags(true);
                  }}
                >
                  არჩევა
                </SelectRegion>
              </RegionFilterDiv>
            )}

            {isPriceFilterVisible && (
              <PriceFilterDiv>
                <PriceHeading>ფასის მიხედვით</PriceHeading>
                <JustDiv>
                  <MinInputDiv>
                    <MinInput
                      type="number"
                      value={tempMinPrice}
                      onChange={(e) => setTempMinPrice(e.target.value)}
                    />

                    <MinPriceLabel>მინ.ფასი</MinPriceLabel>
                    <PriceOptions>
                      {[50000, 100000, 150000, 200000, 300000].map(
                        (price, index) => (
                          <PriceOption
                            key={index}
                            onClick={() => setTempMinPrice(price)}
                            selected={Number(tempMinPrice) === price}
                          >
                            {price.toLocaleString()}ლ
                          </PriceOption>
                        )
                      )}
                    </PriceOptions>
                  </MinInputDiv>
                  <MaxInputDiv>
                    <MaxInput
                      type="number"
                      value={tempMaxPrice}
                      onChange={(e) => setTempMaxPrice(e.target.value)}
                    />

                    <MaxPriceLabel>მაქს.ფასი</MaxPriceLabel>
                    <PriceOptionss>
                      {[60000, 100000, 150000, 200000, 400000].map(
                        (price, index) => (
                          <PriceOption
                            key={index}
                            onClick={() => setTempMaxPrice(price)}
                            selected={Number(tempMaxPrice) === price}
                          >
                            {price.toLocaleString()}ლ
                          </PriceOption>
                        )
                      )}
                    </PriceOptionss>
                  </MaxInputDiv>
                </JustDiv>
                <ChooseBtn
                  onClick={() => {
                    const min = cleanValue(tempMinPrice);
                    const max = cleanValue(tempMaxPrice);

                    if (min && max && min > max) {
                      setPriceError(" შეიყვანეთ ვალიდური რიცხვები");
                      return;
                    }

                    setSelectedMinPrice(tempMinPrice);
                    setSelectedMaxPrice(tempMaxPrice);
                    setApplyPriceFilter(true);
                    setShowAppliedPriceTag(true);
                    setIsPriceFilterVisible(false);
                    setPriceError("");
                  }}
                >
                  არჩევა
                </ChooseBtn>
                {priceError && <ValidationError>{priceError}</ValidationError>}
              </PriceFilterDiv>
            )}
          </FilterWrapper>
          <ListingContainer>
            {applyRegionFilter ||
            applyPriceFilter ||
            applyAreaFilter ||
            applyBedroomsFilter ? (
              filteredListings.length > 0 ? (
                filteredListings.slice(0, 8).map((listing) => (
                  <ListingCard key={listing.id}>
                    <ImageWrapper>
                      <TagImgDiv>
                        <TagLabel>
                          {listing.is_rental ? "ქირავდება" : "იყიდება"}
                        </TagLabel>
                      </TagImgDiv>
                      <PropertyImage src={listing.image} alt="Property" />
                    </ImageWrapper>
                    <Price>{listing.price}ლ</Price>
                    <Location>
                      <LocIcon src="/LocIcon.svg" alt="Location" />{" "}
                      {listing.city.name}, {listing.address}
                    </Location>
                    <Details>
                      <DetailItem>
                        <Icon src="/bed.svg" alt="Bed" />
                        {listing.bedrooms}
                      </DetailItem>
                      <DetailItem>
                        <Icon src="/Vector.svg" alt="Area" />
                        {listing.area}მ²
                      </DetailItem>
                      <DetailItem>
                        <Icon src="/index.svg" alt="Index" />
                        {listing.zip_code}
                      </DetailItem>
                    </Details>
                  </ListingCard>
                ))
              ) : (
                <NoResultsMessage>შედეგი ვერ მოიძებნა</NoResultsMessage>
              )
            ) : null}
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
  margin: 100px auto 20px;
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
  margin-top: 40px;
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

const TagLabel = styled.div`
  background-color: ${({ children }) =>
    children === "ქირავდება" ? "#28a745" : "#f93b1d"};
  color: white;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 14px;
  font-weight: bold;
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

const SelectedRegionTags = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 10px;
`;

const Tag = styled.div`
  background: #f3f3f3;
  border-radius: 20px;
  padding: 6px 12px;
  display: flex;
  align-items: center;
  font-size: 14px;
`;

const RemoveIcon = styled.span`
  margin-left: 8px;
  cursor: pointer;
  font-weight: bold;
  color: #ff4d4f;
`;
const ValidationError = styled.p`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;
const NoResultsMessage = styled.p`
  font-size: 18px;
  color: #f93b1d;
  margin: 50px auto;
  text-align: center;
  grid-column: span 4;
`;
const FilterTagsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
`;

const ClearAll = styled.span`
  cursor: pointer;
  color: #f93b1d;
  font-weight: bold;
  font-size: 14px;
  padding: 4px 10px;
  border-radius: 20px;
  background: #ffecec;
  &:hover {
    background: #ffdbdb;
  }
`;
