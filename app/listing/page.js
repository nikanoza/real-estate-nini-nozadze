"use client";
import React from "react";
import styled from "styled-components";
import GlobalStyle from "../GlobalStyles";

export default function Listing() {
  return (
    <>
      <AllComponents>
        <GlobalStyle />
        <BackArrow src="/leftArrow.svg" />
        <Container>
          <HomeImg src="/image.svg" />
          <DetailsSection>
            <Price>80, 000ლ</Price>
            <Info>
              <IconText>
                <AddressImg src="/LocIcon.svg" />
                თბილისი, ი.ჭავჭავაძის 53
              </IconText>
              <IconText>
                <FartobiImg src="/Vector.svg" />
                ფართი 55მ2
              </IconText>
              <IconText>
                <SadzinebeliImg src="/bed.svg" />
                საძინებელი 2
              </IconText>
              <IconText>
                <PostImg src="/index.svg" /> საფოსტო ინდექსი 2552
              </IconText>
            </Info>
            <AboutHome>
              იყიდება ბინა ჭავჭავაძის ქუჩაზე, ვაკეში. ბინა არის ახალი რემონტით,
              ორი საძინებლითა და დიდი აივნებით. მოწყობილია ავეჯიტა და ტექნიკით.
            </AboutHome>
            <AgentCard>
              <AgentImg src="/agent.svg" />
              <AgentInfo>
                <AgentName>სოფიო გელოვანი</AgentName>
                <Status>აგენტი</Status>
                <IconText>
                  <MailImg src="/mail.svg" />
                  sophio.gelovani@redberry.ge
                </IconText>
                <IconText>
                  <MobImg src="/mob.svg" />
                  577 777 777
                </IconText>
              </AgentInfo>
            </AgentCard>
            <DeleteBtn>ლისტინგის წაშლა</DeleteBtn>
            <Dates>გამოქვეყნების თარიღი 08/08/24</Dates>
          </DetailsSection>
        </Container>
        <SwiperHeading>ბინები მსგავს ლოკაციაზე</SwiperHeading>
        <SwiperContainer>
          <LeftArrow src="/leftArrow.svg" />
          <PropertiesWrapper>
            {Array.from({ length: 4 }).map((_, index) => (
              <PropertyCard key={index}>
                <ImageContainer>
                  <BadgeWrapper>
                    <BadgeIcon src="/Tag.svg" alt="Badge" />
                  </BadgeWrapper>
                  <PropertyPic src="/image.svg" alt="Property" />
                </ImageContainer>
                <Cost>80 000ლ</Cost>
                <Address>
                  <LocationIcon src="/LocIcon.svg" alt="Location" /> თბილისი,
                  ი.ჭავჭავაძის 53
                </Address>
                <Features>
                  <FeatureItem>
                    <FeatureIcon src="/bed.svg" alt="Bed" />2
                  </FeatureItem>
                  <FeatureItem>
                    <FeatureIcon src="/Vector.svg" alt="Area" />
                    55მ2
                  </FeatureItem>
                  <FeatureItem>
                    <FeatureIcon src="/index.svg" alt="Index" />
                    0160
                  </FeatureItem>
                </Features>
              </PropertyCard>
            ))}
          </PropertiesWrapper>
          <RightArrow src="/rightArrow.svg" />
        </SwiperContainer>
      </AllComponents>
    </>
  );
}
const AllComponents = styled.div`
  padding: 50px 50px 50px 50px;
`;

const Container = styled.div`
  display: flex;
  gap: 20px;
  border-radius: 10px;
  background: #fff;
`;
const BackArrow = styled.img``;

const HomeImg = styled.img`
  width: 50%;
  border-radius: 10px;
`;

const DetailsSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-left: 40px;
  margin-top: 30px;
`;

const Price = styled.p`
  font-size: 28px;
  font-weight: bold;
  color: #021526;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 17px;
`;

const IconText = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  font-size: 18px;
`;

const AddressImg = styled.img``;
const FartobiImg = styled.img``;
const SadzinebeliImg = styled.img``;
const PostImg = styled.img``;

const AboutHome = styled.p`
  font-size: 17px;
  font-weight: normal;
  line-height: 1.5;
  color: #333;
  text-align: justify;
  margin-top: 10px;
  max-width: 500px;
`;

const AgentCard = styled.div`
  width: 503px;
  height: 174px;
  display: flex;
  gap: 15px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 10px;
  margin-top: 50px;
`;

const AgentImg = styled.img`
  width: 72px;
  height: 72px;
`;

const AgentInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AgentName = styled.p`
  font-size: 18px;
  font-weight: bold;
`;

const Status = styled.p`
  font-size: 14px;
  color: gray;
`;

const MailImg = styled.img``;
const MobImg = styled.img``;

const DeleteBtn = styled.button`
  width: 140px;
  height: 34px;
  background: white;
  color: black;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  margin-top: 10px;
`;

const Dates = styled.p`
  font-size: 14px;
  color: gray;
`;
const SwiperHeading = styled.h1`
  margin-bottom: 35px;
  margin-top: 50px;
  font-size: 32px;
`;

const PropertiesWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
  justify-content: center;
`;

const PropertyCard = styled.div`
  width: 323px;
  height: 400px;
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 150px;
`;

const BadgeWrapper = styled.div`
  position: absolute;
  top: 0px;
  left: 10px;
`;

const BadgeIcon = styled.img`
  width: 80px;
  height: 70px;
`;

const PropertyPic = styled.img`
  width: 100%;
  height: 150%;
  object-fit: cover;
  border-radius: 8px;
`;

const Cost = styled.p`
  font-size: 25px;
  font-weight: bold;
  margin-top: 100px;
`;

const Address = styled.p`
  margin-top: 10px;
  display: flex;
  align-items: center;
  font-size: 16px;
  color: #555;
`;

const LocationIcon = styled.img`
  width: 16px;
  height: 16px;
  margin-right: 8px;
`;

const Features = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-top: 24px;
  gap: 40px;
`;

const FeatureItem = styled.div`
  display: flex;
  align-items: center;
  font-size: 14px;
  color: #333;
`;

const FeatureIcon = styled.img`
  width: 26px;
  height: 20px;
`;
const SwiperContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-top: 20px;
`;

const LeftArrow = styled.img`
  cursor: pointer;
  position: absolute;
  left: -40px;
`;

const RightArrow = styled.img`
  cursor: pointer;
  position: absolute;
  right: -40px;
`;
