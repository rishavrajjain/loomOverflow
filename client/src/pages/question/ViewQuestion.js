import React,{useEffect,useState} from 'react';
import axios from 'axios';
import {toast} from 'react-toastify';
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import StatsIllustrationSrc from "images/stats-illustration.svg";
import { ReactComponent as SvgDotPattern } from "images/dot-pattern.svg";
import { oembed } from "@loomhq/loom-embed";
import Navbar from 'components/layout/Navbar';
import './question.css';

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 md:h-auto relative`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`
]);
const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Statistics = tw.div`flex flex-col items-center sm:block text-center md:text-left mt-4`;
const Statistic = tw.div`text-left sm:inline-block sm:mr-12 last:mr-0 mt-4`;
const Value = tw.div`font-bold text-lg sm:text-xl lg:text-2xl text-secondary-500 tracking-wide`;
const Key = tw.div`font-medium text-primary-700`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-8 md:mt-10 text-sm inline-block mx-auto md:mx-0`;

const DecoratorBlob = styled(SvgDotPattern)(props => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10`
]);

export default function ViewQuestion(props) {

    const [question,setQuestion]=useState();
    const [loading,setLoading]=useState(true);
    const [answers,setAnswers]=useState([]);

    const imageSrc = StatsIllustrationSrc
    const imageCss = null
    const imageContainerCss = null
    const imageDecoratorBlob = false
    const imageDecoratorBlobCss = null
    const imageInsideDiv = true
    const statistics = null
    const textOnLeft = false

    useEffect(()=>{
        const id = props.match.params.id;
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/question/${id}`).then((res) => {
            console.log(res.data.data)
            setQuestion(res.data.data);
            setAnswers(res.data.answers);
            setLoading(false);
        }).catch(err => {
            console.log(err);
            setLoading(false)
            toast.error('Something went wrong.Please try again.', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        })
    },[])
    return loading?(
      <div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

      <div class="col-sm-6 text-center"><p>Loading ...</p>
        <div class="loader4"></div>

      </div>

    </div>
    ):(
        <div>
            <Navbar/>
        
        <Container>
      <TwoColumn css={!imageInsideDiv && tw`md:items-center`}>
        <ImageColumn css={imageContainerCss}>
          {imageInsideDiv ? <Image imageSrc={imageSrc} css={imageCss} /> : <img src={imageSrc} css={imageCss} alt="" />}
          {imageDecoratorBlob && <DecoratorBlob css={imageDecoratorBlobCss} />}
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
             <Subheading>Question</Subheading>
            <Heading>{question.title}</Heading>
           <div dangerouslySetInnerHTML={{ __html: question.detail }}></div>
            {
                question.tags.split(",").map((tag)=>{
                    return(
                        <h6 className="badge badge-dark" style={{marginLeft:'0.3rem'}}><i className="fa fa-tags"></i>{'  '+tag.toUpperCase()}</h6>
                    )
                })
            }
            <br/>
            <PrimaryButton onClick={()=>{
                props.history.push(`/answer/add/${question._id}`)
            }} >
              Add Answer
            </PrimaryButton>
            <hr></hr>
            <Description>Answers</Description>
            {
                answers.map((answer)=>{
                    return(
                        <div>
                            <div dangerouslySetInnerHTML={{ __html: answer.content }}></div>
                            <h6>Video by {answer.author.email.split("@")[0]}</h6>
                            <hr></hr>
                        </div>
                    )
                })
            }
          </TextContent>
        </TextColumn>
        
      </TwoColumn>
    </Container>
    </div>
    )
}
