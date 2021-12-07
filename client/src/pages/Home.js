import React, { useEffect, useState } from 'react';
import styled from "styled-components";
import tw from "twin.macro";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import axios from 'axios';
import {toast} from 'react-toastify'
import Navbar from 'components/layout/Navbar';
import { motion } from "framer-motion";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as LinkIcon } from "feather-icons/dist/icons/link.svg";
import { ReactComponent as EyeIcon } from "feather-icons/dist/icons/eye.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";
import './style.css';

import MainFeature1 from "components/features/TwoColWithButton.js";

import Features from "components/features/ThreeColSimple.js";




const Subheading = tw.span`uppercase tracking-wider text-sm`;
const Heading = tw(SectionHeading)`w-full`;
const Description = tw(SectionDescription)`w-full text-center`;

const Column = tw.div`flex flex-col items-center`;
const HeaderContent = tw.div``;

const FAQSContainer = tw.dl`mt-12 max-w-4xl relative`;
const FAQ = tw.div`cursor-pointer select-none mt-5 px-8 sm:px-10 py-5 sm:py-4 rounded-lg text-gray-800 hover:text-gray-900 bg-gray-200 hover:bg-gray-300 transition duration-300`;
const Question = tw.dt`flex justify-between items-center`;
const QuestionText = tw.span`text-lg lg:text-xl font-semibold`;
const QuestionToggleIcon = motion(styled.span`
  ${tw`ml-2 transition duration-300`}
  svg {
    ${tw`w-6 h-6`}
  }
`);
const Answer = motion(tw.dd`pointer-events-none text-sm sm:text-base leading-relaxed`);

const DecoratorBlob1 = styled(SvgDecoratorBlob1)`
  ${tw`pointer-events-none -z-20 absolute right-0 top-0 h-56 w-56 opacity-15 transform translate-x-2/3 -translate-y-12 text-teal-400`}
`;
const DecoratorBlob2 = styled(SvgDecoratorBlob2)`
  ${tw`pointer-events-none -z-20 absolute left-0 bottom-0 h-64 w-64 opacity-15 transform -translate-x-2/3 text-primary-500`}
`;

const PrimaryButton = styled(PrimaryButtonBase)(props => [
  tw`mt-8 md:mt-8 text-sm inline-block mx-auto md:mx-0`,
  props.buttonRounded && tw`rounded-full`
]);

export default function Home(props) {
  const [loading,setLoading]=useState(true);
  const [questions,setQuestions]=useState();
  const [search,setSearch]=useState('');
  useEffect(()=>{
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/questions`).then((res)=>{
      setQuestions(res.data.data);
      setLoading(false);
    }).catch(err=>{
      toast.error('Something went wrong', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    })
  },[])

  const fetchMostViewedQuestions = async()=>{
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/mostViewedQuestions`).then((res)=>{
      setQuestions(res.data.data);
      setLoading(false);
    }).catch(err=>{
      toast.error('Something went wrong', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    })
  }

  const searchData = async(e)=>{
    e.preventDefault();
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/questions/search/${search}`).then((res)=>{
      setQuestions(res.data.data);
      setLoading(false);
    }).catch(err=>{
      toast.error('Something went wrong', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
    })
  }
  return loading?( <div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

  <div class="col-sm-6 text-center"><p>Loading ...</p>
    <div class="loader4"></div>

  </div>

</div>): (
    <div>
    <Navbar/>
    <div>
      
      <MainFeature1
        subheading={<Subheading>Loom Overflow</Subheading>}
        heading="Get solutions for your questions in Short videos."
        description="Short videos have taken the world by storm.Use this amazing format for finding best answers, explanations, ideas on questions topics and more."
        buttonRounded={false}
        primaryButtonText="Powered by Loom"
        primaryButtonUrl="https://www.loom.com/"
        imageSrc="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=768&q=80"
      />
     
      <Features
        subheading={<Subheading>Loom Overflow</Subheading>}
        heading=""
        description="Ever wanted a solution on stackoverflow or quora or reddit where someone walks you through the problem and solution.This is the platform for you."
        cards={[]}
        linkText=""
      />
     
      
    </div>
    <div className="container" style={{marginTop:'4rem'}}>
      <PrimaryButton onClick={fetchMostViewedQuestions} style={{marginBottom:'1rem'}}>Most Viewed Questions</PrimaryButton>
      
      <br></br>
      <div className="row">
        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
          <input className="form-control" name="seacrh" placeholder="Search ..." onChange={(e)=>{setSearch(e.target.value)}}/>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12">
        <button className="btn btn-light btn-block" onClick={searchData}>Search</button>
        </div>
      
      </div>
      
           
            <br></br>
    </div>
    

    <Container>
      <ContentWithPaddingXl>
        <Column>
          <HeaderContent>
            
            
            <Heading>Questions</Heading>
            
          </HeaderContent>
          <FAQSContainer>
            {questions.map((question, index) => (
              <FAQ
                key={index}
                className="group"
                
              >
                <Question>
                
                  <QuestionText>{question.title} Views : {question.views+'  '}</QuestionText>
                  
                  <QuestionToggleIcon
                    
                    
                  >
                    <LinkIcon onClick={()=>{
                        props.history.push(`/question/view/${question._id}`)
                    }} />
                    
                    
                   
                  </QuestionToggleIcon>
                </Question>
                
              </FAQ>
            ))}
          </FAQSContainer>
        </Column>
      </ContentWithPaddingXl>
      <DecoratorBlob1/>
      <DecoratorBlob2 />
    </Container>
      
    </div>
  )
}
