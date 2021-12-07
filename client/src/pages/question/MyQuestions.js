import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './question.css';
import { motion } from "framer-motion";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { SectionDescription } from "components/misc/Typography.js";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { ReactComponent as LinkIcon } from "feather-icons/dist/icons/link.svg";
import { ReactComponent as EditIcon } from "feather-icons/dist/icons/edit.svg";
import { ReactComponent as SvgDecoratorBlob1 } from "images/svg-decorator-blob-7.svg";
import { ReactComponent as SvgDecoratorBlob2 } from "images/svg-decorator-blob-8.svg";
import Navbar from 'components/layout/Navbar';

const Subheading = tw(SubheadingBase)`mb-4 text-center`;
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

export default function MyQuestions(props) {
    const token = localStorage.getItem('app-token');
    const [questions,setQuestions]=useState([]);
    const [loading,setLoading]=useState(true);
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };

    useEffect(()=>{
        axios.get(`${process.env.REACT_APP_API_BASE_URL}/questions/my`,config).then((res)=>{
            setQuestions(res.data.data);
            setLoading(false);
        }).catch((err)=>{
            console.log(err);

            setLoading(false);
        })

    },[])
    return loading ? (
        <div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

      <div class="col-sm-6 text-center"><p>Loading ...</p>
        <div class="loader4"></div>

      </div>

    </div>
    ):(
        <div>
            <Navbar/>
        
        <Container>
      <ContentWithPaddingXl>
        <Column>
          <HeaderContent>
            <Subheading></Subheading>
            <Heading>Your Questions</Heading>
            
          </HeaderContent>
          <FAQSContainer>
            {questions.map((question, index) => (
              <FAQ
                key={index}
                className="group"
                
              >
                <Question>
                  <QuestionText>{question.title}</QuestionText>
                  <QuestionToggleIcon
                    
                    
                  >
                    <LinkIcon onClick={()=>{
                        props.history.push(`/question/view/${question._id}`)
                    }} />
                    <EditIcon onClick={()=>{
                        props.history.push(`/question/edit/${question._id}`)
                    }} style={{marginLeft:'1rem'}}></EditIcon>
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
