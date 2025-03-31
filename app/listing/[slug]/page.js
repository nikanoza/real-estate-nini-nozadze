"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import styled from "styled-components";
import { getListingById, getListings } from "@/services/listingService";
import GlobalStyle from "@/app/GlobalStyles";
import Link from "next/link";

export default function Listing() {
  const { slug } = useParams();
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [similarListings, setSimilarListings] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const ITEMS_PER_PAGE = 4;
  const handleNext = () => {
    if (currentIndex + ITEMS_PER_PAGE < similarListings.length) {
      setCurrentIndex((prev) => prev + ITEMS_PER_PAGE);
    }
  };

  const handlePrev = () => {
    if (currentIndex - ITEMS_PER_PAGE >= 0) {
      setCurrentIndex((prev) => prev - ITEMS_PER_PAGE);
    }
  };

  useEffect(() => {
    const fetchListingAndSimilar = async () => {
      try {
        const data = await getListingById(slug);
        setListing(data);

        const allListings = await getListings();
        const filtered = allListings.filter(
          (item) => item.id !== data.id && item.city?.id === data.city?.id
        );
        setSimilarListings(filtered);
        setCurrentIndex(0);
      } catch (err) {
        console.error("Failed to fetch listing or similar listings:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchListingAndSimilar();
  }, [slug]);

  if (loading) return <p>Loading...</p>;
  if (!listing) return <p>Listing not found</p>;

  return (
    <>
      <AllComponents>
        <GlobalStyle />
        <Link href="/">
          <BackArrow src="/leftArrow.svg" alt="go back" />
        </Link>
        <Container>
          <HomeImg src={listing.image} alt="property" />
          <DetailsSection>
            <Price>{listing.price}₾</Price>
            <Info>
              <IconText>
                <AddressImg src="/LocIcon.svg" />
                {listing.city?.name}, {listing.address}
              </IconText>
              <IconText>
                <FartobiImg src="/Vector.svg" />
                ფართი {listing.area}მ²
              </IconText>
              <IconText>
                <SadzinebeliImg src="/bed.svg" />
                საძინებელი {listing.bedrooms}
              </IconText>
              <IconText>
                <PostImg src="/index.svg" /> საფოსტო ინდექსი {listing.zip_code}
              </IconText>
            </Info>
            <AboutHome>{listing.description}</AboutHome>
            <AgentCard>
              <AgentImg src={listing.agent.avatar} alt="Agent" />
              <AgentInfo>
                <AgentName>
                  {listing.agent.name} {listing.agent.surname}
                </AgentName>
                <Status>აგენტი</Status>
                <IconText>
                  <MailImg src="/mail.svg" />
                  {listing.agent.email}
                </IconText>
                <IconText>
                  <MobImg src="/mob.svg" />
                  {listing.agent.phone}
                </IconText>
              </AgentInfo>
            </AgentCard>
            <DeleteBtn>ლისტინგის წაშლა</DeleteBtn>
            <Dates>
              გამოქვეყნების თარიღი{" "}
              {new Date(listing.created_at).toLocaleDateString()}
            </Dates>
          </DetailsSection>
        </Container>
        <SwiperHeading>ბინები მსგავს ლოკაციაზე</SwiperHeading>
        <SwiperContainer>
          <LeftArrow
            onClick={handlePrev}
            src="/leftArrow.svg"
            style={{
              opacity: currentIndex === 0 ? 0.3 : 1,
              cursor: currentIndex === 0 ? "default" : "pointer",
            }}
          />
          <PropertiesWrapper>
            {similarListings.length > 0 ? (
              similarListings
                .slice(currentIndex, currentIndex + ITEMS_PER_PAGE)
                .map((item) => (
                  <Link
                    key={item.id}
                    href={`/listing/${item.id}`}
                    style={{ textDecoration: "none", color: "grey" }}
                  >
                    <PropertyCard>
                      <ImageContainer>
                        <BadgeWrapper>
                          <BadgeIcon src="/Tag.svg" alt="Badge" />
                        </BadgeWrapper>
                        <PropertyPic src={item.image} alt="Property" />
                      </ImageContainer>
                      <Cost>{item.price}₾</Cost>
                      <Address>
                        <LocationIcon src="/LocIcon.svg" alt="Location" />{" "}
                        {item.city.name}, {item.address}
                      </Address>
                      <Features>
                        <FeatureItem>
                          <FeatureIcon src="/bed.svg" alt="Bed" />
                          {item.bedrooms}
                        </FeatureItem>
                        <FeatureItem>
                          <FeatureIcon src="/Vector.svg" alt="Area" />
                          {item.area}მ²
                        </FeatureItem>
                        <FeatureItem>
                          <FeatureIcon src="/index.svg" alt="Index" />
                          {item.zip_code}
                        </FeatureItem>
                      </Features>
                    </PropertyCard>
                  </Link>
                ))
            ) : (
              <p>მსგავსი ბინები ვერ მოიძებნა</p>
            )}
          </PropertiesWrapper>
          <RightArrow
            onClick={handleNext}
            src="/rightArrow.svg"
            style={{
              opacity:
                currentIndex + ITEMS_PER_PAGE >= similarListings.length
                  ? 0.3
                  : 1,
              cursor:
                currentIndex + ITEMS_PER_PAGE >= similarListings.length
                  ? "default"
                  : "pointer",
            }}
          />
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
