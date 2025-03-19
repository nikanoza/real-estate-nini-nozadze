"use client";
import React from "react";
import styled from "styled-components";
import GlobalStyle from "../GlobalStyles";

export default function Listing() {
  return (
    <>
      <GlobalStyle />
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
    </>
  );
}

const Container = styled.div`
  display: flex;
  gap: 20px;
  border-radius: 10px;
  background: #fff;
`;

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
