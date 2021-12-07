import React, { useState } from 'react'
import TagsInput from 'react-tagsinput';
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import TeamIllustrationSrc from "images/team-illustration-2.svg";
import {ReactComponent as SvgDotPattern } from "images/dot-pattern.svg";
import 'react-tagsinput/react-tagsinput.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {toast} from 'react-toastify';
import axios from 'axios';
import Navbar from 'components/layout/Navbar';
import './question.css';

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between max-w-screen-xl mx-auto py-20 md:py-24 items-center`;
const Column = tw.div`w-full max-w-md mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-6/12 flex-shrink-0 relative`;
const TextColumn = styled(Column)(props => [
  tw`md:w-6/12 mt-16 md:mt-0`,
  props.textOnLeft ? tw`md:mr-12 lg:mr-16 md:order-first` : tw`md:ml-12 lg:ml-16 md:order-last`
]);

const Image = styled.img(props => [
  props.imageRounded && tw`rounded`,
  props.imageBorder && tw`border`,
  props.imageShadow && tw`shadow`,
]);

const DecoratorBlob = styled(SvgDotPattern)(props => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10`,
])

const TextContent = tw.div`lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl sm:text-4xl lg:text-5xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const PrimaryButton = styled(PrimaryButtonBase)(props => [
  tw`mt-8 md:mt-8 text-sm inline-block mx-auto md:mx-0`,
  props.buttonRounded && tw`rounded-full`
]);
 

export default function AskQuestion() {

    const [title,setTitle]=useState('');
    const [detail,setDetail]=useState('');
    const [tags,setTags]=useState([]);

    const token = localStorage.getItem('app-token');
    const [loading,setLoading]=useState(false);
    const config = {
        headers: { 'Authorization': `Bearer ${token}`,
        'Content-type':'application/json'
     }
    };


  const imageSrc = TeamIllustrationSrc
  const buttonRounded = true
  const imageRounded = true
  const imageBorder = false
  const imageShadow = false
  const imageCss = null
  const imageDecoratorBlob = false
  const imageDecoratorBlobCss = null
  const textOnLeft = true

  const submit =async (e)=>{
    e.preventDefault();
    try{
        if(title === '' || detail === '' || tags === []){
            toast.error('Please fill all details', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
                return;
        }
        setLoading(true);
        const result = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/question/ask`,{
            title:title,
            detail:detail,
            tags:tags.join(",")
        },config)
        setLoading(false)
        toast.success('Question added successfully', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });

    }catch(err){
      setLoading(false);
        toast.error('Something went wrong', {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }
  }
    return loading ?( <div class="d-flex justify-content-center" style={{ marginTop: '5rem' }}>

    <div class="col-sm-6 text-center"><p>Loading ...</p>
      <div class="loader4"></div>

    </div>

  </div>):(
        <div>
            <Navbar/>
        
        <div className="container">
        <Container>
      <TwoColumn>
        <ImageColumn>
          <Image css={imageCss} src={imageSrc} imageBorder={imageBorder} imageShadow={imageShadow} imageRounded={imageRounded}/>
          {imageDecoratorBlob && <DecoratorBlob css={imageDecoratorBlobCss} />}
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Subheading>Get amazing video answers for your questions</Subheading>
            <Heading>Ask Question</Heading>
            <div className="form-group">
            <Description>Title</Description>
                <input name="title" value={title} onChange={(e)=>{setTitle(e.target.value)}} className="form-control"/>
                <br/>
                <Description>Detail</Description>
                <CKEditor
                    editor={ ClassicEditor }
                    data="<p>Your Question</p>"
                    onReady={ editor => {
                        
                        console.log( 'Editor is ready to use!', editor );
                    } }
                    onChange={ ( event, editor ) => {
                        const data = editor.getData();
                        setDetail(data);
                    } }
                    
                />
                <br/>
                <Description>Tags</Description>
                <TagsInput value={tags} onChange={(tagsData)=>setTags(tagsData)} />
            </div>
            <PrimaryButton buttonRounded={buttonRounded}  onClick={submit}>
              Submit
            </PrimaryButton>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
       
        </div>
        </div>
    )
}
