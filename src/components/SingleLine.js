import { useEffect, useMemo, useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import defaultStyle from "./defaultStyle";
import defaultMentionStyle from "./defaultMentionStyle";
//import JsonDisplay from "./JsonDisplay2.js";
//import AutoComplete from "./AutoComplete.js";

import inputData from "../data/dataSongsMain1v3.js";
//import inputData from "../data/dataSongs50Interprets.js";

const SingleLine = () => {
  const [interprets, setInterprets] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [data, setDataSource] = useState([]);
  const [lastTypedParent, setLTP] = useState([]);
  //const [prevItem, setPrevItem] = useState([]);
  const [value, setValue] = useState("");
  const [prevValue, setPrevValue] = useState("");
  const [inputLength, setInputLength] = useState(0);

  const [mentions, setMentions] = useState([]);
  //const [mention, setMention] = useState(null); COMMENTED
  const [lastMention, setLMention] = useState(null);
  const [mentionTrigger, setTrigger] = useState("@");
  const [prevMenLen, setPML] = useState(0);

  console.log("\n---------------------initial START----------------------");
  console.log("trigger(render): ", mentionTrigger);

useEffect (() => {
  setInterprets(inputData);
  setDataSource(inputData);
  //console.log("DATA LOAD 1: ", interprets);
}, []);

console.log("\n---------------------initial END----------------------");

  const onChange = (e) => {
    console.log("\n---------------------onChange START----------------------");
    console.log("DATA LOAD 3: ", interprets);
    setValue(e.target.value);
    
    var input = e.target.value;
    //console.log("-->arrive: input: ", input);
    const inptLength = input.length;
    var mentions = null;
    
    // Extract and pass mentions to onAddMention function
  const mentionsTmp = extractMentions(input);
  console.log("mentionsTmp: ", mentionsTmp);
  mentionsTmp.forEach(mention1 => {
    onAddMention(mention1);
    console.log("mention1: ", mention1.id);
  });
    const trimInput = e.target.value.trim();
    const isEmptyInput = trimInput === "";
    // Check if the previous character is space or it is the first character in the textbox
    const isPrevCharSpace = input.slice(-1) === " ";
    const isPrevCharEmpty = inputLength === 0;
    const isPrevCharAt = input.slice(-1) === "@";
    const isPrevCharDot = input.slice(-1) === ".";
    const prevPrevValue = input.slice(-2).slice(0, -1);
    const isPrevPrevSpace = prevPrevValue === " ";
    setPrevValue(prevPrevValue);
    isPrevCharSpace?setPrevValue(" "):setPrevValue("NO");
    setInputLength(inptLength);
    // Check if the current trigger is '@'
    const isCurrentTriggerAt = mentionTrigger === "@";
  
    // Switch mention trigger based on conditions
    if (!Array.isArray(allMentions) || allMentions === null) {
      setTrigger("@");

      console.log("@ - back to default...");
      if (prevPrevValue !== ' ') {
        setTrigger("@");
        setDataSource(interprets);
      }
    }
    if (inptLength === 0) {
      setTrigger("@");
      setDataSource(interprets);
      console.log("@ - first char");
    }
    if (!isPrevCharSpace && isPrevCharSpace && !isCurrentTriggerAt) {
      setTrigger("@");
      setDataSource(interprets);
    }

    if (isPrevCharSpace || isPrevCharEmpty || isEmptyInput) {
      if (isCurrentTriggerAt && isPrevCharAt ) {
        if (isPrevCharAt) {
          setTrigger("@");
          setDataSource(interprets);
        }
      } 
      if (isPrevCharSpace) {
        setTrigger("");
        setDataSource([]);
        if (isPrevPrevSpace || isPrevCharSpace) {
          setTrigger("");
          setDataSource([]);
        } else {
          setTrigger(".");
          setDataSource(filteredArray); //interprets
        }
      }
      if (prevValue === " " && prevPrevValue === ")") {
        setTrigger("");
        setDataSource([]);
      } 
    } else {  
      if (isPrevCharDot && !isPrevPrevSpace && !isPrevCharSpace) {
        setTrigger(".");
        setDataSource(filteredArray); 
      }
      if ( prevPrevValue !== ')' && (prevPrevValue === '\n' || prevPrevValue === '\s') ) {
        setTrigger("");
        setDataSource([]);
      }
    } 

    if (allMentions.length === 0) {
      setTrigger("@");
      setDataSource(interprets);
    }
    if ( isPrevCharDot && prevPrevValue === '.') {
      setTrigger("");
      setDataSource([]);
    }

    if (inptLength < inputLength) {
      //najdi smazanou mention a odstran ji z pole mentions
      if (Array.isArray(mentions) && mentions.length > 1) {
        setMentions(mentions.pop());
      }
    }
    console.log("---------------------onChange END----------------------");
  };
  
// Function to extract mentions from the input
const extractMentions = (input) => {
  const mentions = [];
  const mentionPattern = /@\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  let mention;
  while ((match = mentionPattern.exec(input)) !== null) {
    mention = {
      id: match[2],
      display: match[1]
    };
    mentions.push(mention);
  }
  return mentions;
};
  

  const allMentions = useMemo( ()=> {
    let a = value.split(/[@]/);
    a = a.filter((a) => a.startsWith("[") && a.includes("]"))
    const arr = a.map((a)=>{
      if(!a.startsWith("[")) return null;
      const i1 = a.indexOf("]");
      const i2 = a.indexOf("(");
      const i3 = a.indexOf(")");
      if(!(i1+1 === i2 && i2+1<i3 && i1>1)) return null;
      const result = a.substring(i2+1,i3);
      setMentions(result);
      if (value.includes(".")) return result; 
      return result;
    });
    return arr.filter(a => a);
  },[value])
  
  

  useEffect(() => {
    console.log("UseEffect called: ", allMentions);

    const mL = allMentions.length;
    const isSmaller = mL < prevMenLen;
    setPML(mL);

    setFilteredArray([]);
    var dataArray = [];
    
    console.log("1- allMentions mentions: ", mentions);
    console.log("1- allMentions: ", allMentions);
    console.log("1- allMentions-1: ", allMentions[allMentions.length - 1]);

    const lastMentionId = allMentions[allMentions.length - 1];
    var lastTypedItem;

    if (allMentions && allMentions.length > 0) {
      lastTypedItem = lastMention?.find(item => item.id === lastMentionId);
      /*
      const res1 = lastMention ? lastMention.find(item => item.id === lastMentionId): null;
      const res2 = data.find(item => item.id === lastMentionId);
      lastTypedItem = lastMention ? res1 : res2;
      
      console.log("1- allMentions-1-lastTypedItem-2: ", lastTypedItem, res1, res2, inputData);
      */
    }

    var a = 0;

    if (typeof(lastTypedItem) === 'undefined') {
      console.log("1- allMentions-1-lastTypedItem-5 parent---------------------------------------------------------");
      console.log("1- allMentions-1-lastTypedItem-5 parent-0 set0: ", lastTypedParent?.id, lastTypedItem?.id, a);  
      if ( 1===1 ) { // || lastTypedParent && typeof(lastTypedParent) !== 'undefined'

        const parentObject = lastTypedParent?.parent;
        console.log("1- allMentions-1-lastTypedItem-5 parent-0 set ----------------: pt, ptObj: ", lastTypedParent, parentObject);

        if (isSmaller) {    
          console.log("1- allMentions-1-lastTypedItem-5 parent---------------Smaler-------------------------------------");
          console.log("1- allMentions-1-lastTypedItem-5 parent-0 set Smaller: ", lastTypedParent?.id, lastTypedItem?.id, a);
          a = 1;
          //lastTypedItem = lastTypedParent.children.parent.id;
          //lastTypedItem = parentObject;
          //lastTypedItem = interprets.find(item => item.id === allMentions[allMentions.length -1]);
          //setLMention(lastTypedItem?.children);
          console.log("1- allMentions-1-lastTypedItem-5 parent-0 set1: ", lastTypedParent?.id, lastTypedItem?.id, a);
        } else {
          //Zde je problem. Pokud se nesmazal prvek, nastavi se lastTypedItem chybne na interpreta (prvni level).
          if (allMentions.length === 1) {
            lastTypedItem = interprets.find(item => item.id === allMentions[0]); 
            a = 2;
            console.log("1- allMentions-1-lastTypedItem-5 parent-0 set2 NotSmaller: ", lastTypedParent?.id, lastTypedItem?.id, a);
          }
        }
        //setLTP(prevItem);
      } else {
        /*
        //nastane nekdy???
        lastTypedItem = interprets.find(item => item.id === allMentions[0]);
        //lastTypedItem = interprets.find(item => item.id === allMentions[0]); 
        a = 3;
        console.log("1- allMentions-1-lastTypedItem-5 parent-0 set3: ", lastTypedParent?.id, lastTypedItem?.id, a);
        */
      }
      //setPrevItem(lastTypedItem); COMMENTED

    } else {
      /*
      if (1===2 && lastTypedParent && typeof(lastTypedParent) !== 'undefined'){
        const item = {
          id: lastTypedItem?.id,
          display: lastTypedItem?.display,
          type: lastTypedItem?.type,
          parent: lastTypedParent?.id
        };
        setLTP(item);
      }
      */
    }

    console.log("1- allMentions-1-lastTypedItem-4: ", lastTypedItem, interprets, allMentions);
    console.log("1- allMentions-1-lastTypedItem-5: ", lastTypedItem, "parent: ", lastTypedParent, a, "ML: ", isSmaller);
    console.log("1- allMentions-1-lastTypedItem-5 parent-0 Final: ", lastTypedParent?.id, lastTypedItem?.id, a);

    //const lastTypedItem = data.find(item => item.id === lastMentionId);

    // If there are no mentions, show all top-level items
    if (allMentions.length === 0) {
      data.forEach(item => {
        if (!allMentions.includes(item.id) ) {
          dataArray.push({ id: item.id, display: '.' + item.display, type: item.type });
        }
        if (item.children && item.children.length > 0) {
          setLMention(item.children);
        }
      }); 
    } else {
      console.log("1- allMentions has-elm: lastMentionId: ", lastMentionId, ', lastTypedItem: ', lastTypedItem, "lastMention: ", lastMention);
      // Check if lastTypedItem is not undefined
        console.log("1- allMentions x ITEM: ", lastMentionId, ', lastTypedItem: ', lastTypedItem);

        if (typeof(lastTypedItem) !== 'undefined' && lastTypedItem !== null ) {
          //setLMention(lastTypedItem.children);
          setLMention(lastTypedItem.children);
        }
        var foundItem = null;
        // Function to traverse all children of the last typed item and collect them in dataArray
        const traverseChildren = (item) => { //parent
          console.log("1- Item found ----------------------------");
          console.log("1- Item found ----------------------------", item);
          // Add the current item to dataArray if it hasn't been inserted yet
          if (item && item !== null && typeof(item) !== 'undefined') {
            if (allMentions[allMentions.length - 1] === item.id) { //!allMentions.includes(item.id)
              //dataArray.push({ id: item.id, display: '.' + item.display, type: item.type });
              //console.log("1- allMentions -------------------------");
              //console.log("1- allMentions add item.id: ", item.id);
              foundItem = item;
              console.log("1- Item found: ", foundItem.id);
              return;
            } 
            console.log("1- Item found: NO: ", item.id);
            // Recursively traverse children
            if (item.children && item.children.length > 0) {
              item.children.forEach(child => {
                console.log("1- Item found Item child : ", child.display);
                traverseChildren(child); //, item
              });
            } else {
              console.log("1- Item found: No children", item);
              console.log("1- allMentions: No children", item);
            }
          }
          console.log("1- Item found END----------------------------");
        };
        // Traverse all children of the last typed item and collect them in dataArray

        const iterateChildren = (lastItem) => {
          console.log("Recursion func: (iterate): ", lastTypedParent?.id, lastTypedItem?.id, "\n", lastTypedItem, foundItem);
          console.log("1- allMentions-1-lastTypedItem-5 parent1 lastItem:", lastItem);
          if (lastItem && lastItem.children && lastItem !== null && typeof(lastItem) !== 'undefined') { //&& lastItem.children && lastItem.children.length > 0
            console.log("1- allMentions-1-lastTypedItem-5 lastItem:", lastItem.display);
            
            lastItem.children.forEach(item => {
              if (!allMentions.includes(item.id) ) {
                dataArray.push({ id: item.id, display: '.' + item.display, type: item.type, parent: lastItem });
                console.log("1- allMentions-1-lastTypedItem-5 item:", item.display);
                console.log("Recursion func: (iterate add): ", item?.id);
              }
            });
          }
        }
        

        if (isSmaller) {
          //console.log("1- allMentions-1-lastTypedItem-5 parent3: :", lastTypedParent);
          console.log("1- allMentions-1-lastTypedItem-5 parent-1a:", lastTypedParent?.id, lastTypedItem?.id);
          //traverseChildren(lastTypedParent);
          if (1===1 || interprets && interprets.length > 0) {
            interprets?.forEach(child => {
              //if (foundItem !== null) return;
              traverseChildren(child);
            });
          }
          //traverseChildren(interprets);
          console.log("1- allMentions-1-lastTypedItem-5 parent-1aa found:", foundItem?.id);
          iterateChildren(foundItem);
          lastTypedItem = foundItem;
          console.log("1- allMentions-1-lastTypedItem-5 parent-1aa:", lastTypedParent?.id, lastTypedItem?.id);
          console.log("Recursion func: ", lastTypedParent?.id, lastTypedItem?.id, lastTypedItem, foundItem);
        } else {
          console.log("1- allMentions-1-lastTypedItem-5 parent-2b:", lastTypedParent?.id, lastTypedItem?.id);
          if (lastTypedItem && typeof(lastTypedItem) !== 'undefined') {
            iterateChildren(lastTypedItem);
          } else {
            interprets?.forEach(child => {
              //if (foundItem !== null) return;
              traverseChildren(child);
            });
            iterateChildren(foundItem);
            lastTypedItem = foundItem;
          }
          console.log("1- allMentions-1-lastTypedItem-5 parent-2b undefined:", lastTypedParent?.id, lastTypedItem?.id);
        }

      
    }
    setFilteredArray(dataArray);
    console.log("\n1- allMentions-1-lastTypedItem-5 pt: ", lastTypedItem);

  }, [allMentions.length]); //allMentions, mentions, data

  const onAddMention = (mention) => {
    //setMention(mention); COMMENTED
    setMentions((prevMentions) => [...prevMentions, mention.id]);
    //writeAllMentions();
    setTrigger("."); 
    console.log("\n--------------ON-ADD-START-----------");
    console.log("setTrigger('.')");
    console.log("mentionAdd: ", mention);
    console.log("get mention: ", getLastMention());
    console.log("mention.id: ", mention.id);
    console.log("--------------ON-ADD-END-----------");
  };
/*
  const onDeleteMention = (mention) => {
    console.log("onDeleteMention: ", mentions);
    if (Array.isArray(mentions) && mentions.length > 1) {
      setMentions(mentions.pop());
    }
  };
*/
  const getLastMention = () => {
    if (mentions.length > 0) {
      return mentions[mentions.length - 1];
    }
    return null;
  };

    const writeAllMentions = () => {
      if (Array.isArray(mentions) && mentions.length > 0) {
        mentions.forEach( (id, display) => {
        console.log("List all:", id, display);
        });
      //console.log(`List all last(${mentions.length}):`, getLastMention());
      }
    }

  //const htmlContent = convertMentionsToHTML(value, selectedMentions);
 /*
  const processMentions = () => {
    if (!currentMention) return;

    const mentionId = currentMention.id;
    const lastDotIndex = mentionId.lastIndexOf(".");
    const processedMention = mentionId.substring(lastDotIndex + 1);

    // Processed mention after the last dot
    console.log("Processed mention:", processedMention);

    // Additional logic to handle the processed mention
  };
  */

  return (
    <div className="single-line">
      <h3>Single line input</h3>

      <MentionsInput
        value={value}
        onChange={onChange}
        placeholder={"Type '@' or '.' for some suggestions."}
        a11ySuggestionsListLabel={"empty"}
        style={defaultStyle}
      >
        <Mention 
         trigger={mentionTrigger} 
         data={data} 
         onAdd={onAddMention}
         style={defaultMentionStyle}
         />
         
      </MentionsInput>
      
      
      {/* <div dangerouslySetInnerHTML={{ __html: htmlContent }} /> */}
      {/*
      <JsonDisplay 
        data={data}
        selectedItem={mentions.value}
      />
      */}
      
      {/*<AutoComplete data={mockUsers} onSelect={() => {}}/>*/}
    </div>
  );
};

export default SingleLine;