/**
 * @returns {JSX.Element}
 * @constructor
 * @file index.jsx
 * @Created By Robin.Gao on  2022/11/9
 */
 import styled from './index.css'
 import Rm from './remove'
 import {useEffect, useRef, useState} from "react";
 
 const Index = (props) => {
 
   let {value} = props
   let sp = props.splitBy || ","
   const [changed, setChanged] = useState(false)
 
   const [tags, setTags] = useState([])
   const [focus, setFocus] = useState(false)
   const ref = useRef()
   const handleFocus = () => {
     setFocus(true)
     setTimeout(() => {
       ref.current.focus()
     }, 10)
 
   }
   const handleInputBlur = (e) => {
     setFocus(false)
     if (e.target.value.trim() === "") {
       return
     }
     let txt = e.target.value.trim()
     if (tags.indexOf(txt) < 0) {
       setChanged(true)
       setTags([...tags, txt])
     }
     e.target.value = ""
   }
 
   const handleTextKeyUp = (e) => {
     if (e.code === "Backspace") {
       if (e.target.value === "") {
         if (tags.length > 0) {
           tags.pop()
           setTags([...tags])
           setChanged(true)
         }
       }
     } else {
       if (e.target.value.trim() === "") {
         return
       }
       let txt = e.target.value.trim()
       let spr = txt.split(sp)
       if (spr.length === 1) {
         return;
       } else {
         setChanged(true)
         if (spr[0].trim() === "" || tags.indexOf(spr[0]) >= 0) {
           e.target.value = spr[1]
         } else {
           setTags([...tags, spr[0]])
           e.target.value = spr[1]
         }
       }
     }
   }
 
   const handleTagRemove = (i) => {
     setChanged(true)
     tags.splice(i, 1)
     setTags([...tags])
   }
 
   useEffect(() => {
     setChanged(false)
     if (typeof value == "string") {
       setTags(value.split(sp))
     } else if (typeof value === "object") {
       if (value.constructor === Array) {
         setTags(value)
       } else {
         console.warn("error data type for", value, "must string or array")
       }
     }
   }, [])
   useEffect(() => {
     if (changed) {
       props.onChange && props.onChange(tags, tags.join(sp))
     }
   }, [tags])
   return (
     <div style={{...props?.style, boxShadow: focus ? "0 0 0 2px rgb(24 144 255 / 20%)" : ""}} className={styled.tagBox}
          onClick={handleFocus}>
       {tags.map((t, i) => {
         return (
           <div className={styled.tag} key={t}>{t}<Rm onClick={() => {
             handleTagRemove(i)
           }}/></div>
         )
       })}
       <div className={styled.inputBox} style={{display: focus ? "" : "none"}}>
         <input ref={ref} onBlur={handleInputBlur} onKeyUp={handleTextKeyUp}/>
       </div>
     </div>
   )
 }
 export default Index
 