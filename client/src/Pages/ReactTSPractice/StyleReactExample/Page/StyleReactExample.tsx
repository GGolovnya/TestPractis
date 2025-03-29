import React from 'react'
import { useNavigate } from 'react-router-dom'
import './StyleReactExample.css'
import { MainComponent } from '../components/ExternalCSS/MainComponent'
import { InlineComponent } from '../components/inlineStyle/InlineComponent'
import { StyledComponentsComponent } from '../components/styledComponents/StyledComponentsComponent'
import { EmotionComponent } from '../components/emotion/EmotionComponent'
import { CSSModulesComponent } from '../components/cssModules/CSSModulesComponent'
import { PreprocessorComponent } from '../components/preprocessors/PreprocessorComponent'

const styleButton = {
  marginTop: 20,
}

export const StyleReactExample = () => {
  const navigate = useNavigate();
  return (
    <div className='PageStyleReactExample' id='PageStyleReactExample'>
      <div className='ContainerStyleReactExample' id='ContainerStyleReactExample'>
        <h1>Страница с примерами Style React Example</h1>
        <div className='ContainerComponentsExampleStyle' id='ContainerComponentsExampleStyle'>
          <MainComponent/>
          <InlineComponent/>
          <StyledComponentsComponent/>
          <EmotionComponent/>
          <CSSModulesComponent/>
          <PreprocessorComponent/>
        </div>
        <button
          style={styleButton}
          onClick={() => navigate('/')}>
          Домой
        </button>
      </div>
    </div>
  )
}
