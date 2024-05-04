import { useEffect, useMemo, useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import defaultStyle from "./defaultStyle";
import defaultMentionStyle from "./defaultMentionStyle";
//import JsonDisplay from "./JsonDisplay2.js";
//import AutoComplete from "./AutoComplete.js";
//import inputData from "../data/dataSongsMain1v3.js";
import inputData from "../data/dataSongs50Interprets.js";

const SingleLine = () => {
  //const map = new Map([]);
  const [interprets, setInterprets] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [data, setDataSource] = useState([]); //mockUsers
  const [blacklist, setBlacklist] = useState(new Set());
  const [maxLevel, setMaxLevel] = useState(0);
  const [lastTypedParent, setLTP] = useState([]);
  const [prevItem, setPrevItem] = useState([]);
  const [insertedItems, setInsertedItems] = useState([]);
  const [value, setValue] = useState("");
  const [prevValue, setPrevValue] = useState("");
  const [inputLength, setInputLength] = useState(0);

  const [mentions, setMentions] = useState([]); //all mentions stored here
  const [mention, setMention] = useState(null);
  const [lastMention, setLMention] = useState(null);
  const [mentionTrigger, setTrigger] = useState("@");
  const [mentionsLength, setML] = useState(0);
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
    //console.log("Onchangeeeeee:", e);
    setValue(e.target.value);
    
    var input = e.target.value;
    console.log("-->arrive: input: ", input);
    const inptLength = input.length;
    //const trigger = mentionTrigger;
    var mentions = null;
    
    // Extract and pass mentions to onAddMention function
  const mentionsTmp = extractMentions(input);
  console.log("mentionsTmp: ", mentionsTmp);
  mentionsTmp.forEach(mention1 => {
    onAddMention(mention1);
    console.log("mention1: ", mention1.id); //mention1.display
    //setMentions((prevMentions) => [...prevMentions, mention]);
    //setMentions([...mentions, mention1]);
    //setMentions(() => [mentionsTmp.id, mentionsTmp.display  ] );
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
  
    console.log("onChange", e);
    console.log("mention-change: ", mention);
    console.log("input: ", input);/*
    console.log("isPrevCharAt: ", isPrevCharAt);
    console.log("isPrevCharDot: ", isPrevCharDot);
    console.log("isCurrentTriggerAt: ", isCurrentTriggerAt);
    console.log("isPrevCharEmpty: ", isPrevCharEmpty);*/
    console.log("prevPrevValue: ", "<"+prevPrevValue+">");
    
    //setDataSource(mockUsers);

    // Switch mention trigger based on conditions
    if (!Array.isArray(allMentions) || allMentions === null) { //!Array.isArray(mentions) || mentions.length < 1
      setTrigger("@");
      //setDataSource(mockUsers);
      //setDataSource(interprets);
      //setDataSource( () => [albumId, albumDisplay]);
      //setBool(false);
      //console.log("Mentions Length: ", mentions.length);
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
          setDataSource(filteredArray);//interprets
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

    if (allMentions.length === 0) { //trimInput === '@'
      setTrigger("@");
      setDataSource(interprets);
    }
    if ( isPrevCharDot && prevPrevValue === '.') { //prevValue === '\s'
      setTrigger("");
      setDataSource([]);
    }

    if (inptLength < inputLength) {
      //najdi smazanou mention a odstran ji z pole mentions
      if (Array.isArray(mentions) && mentions.length > 1) {
        setMentions(mentions.pop());
        //setLength(mentionsLength -1);
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
    //console.log("match: ", match);
    mention = {
      id: match[2], // Assuming the id is the content inside the parenthesis
      display: match[1] // Assuming the display name is the content inside the square brackets
    };
    console.log("mention1234: ", mention);
    
    mentions.push(mention);
  }
  return mentions;
};
  

  const allMentions = useMemo( ()=> {
    let a = value.split(/[@]/); //let a = value.split(/[@:.]/);
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
    } else {
      //TODO
      /*
      const res2 = data;
      lastTypedItem = res2;
      */
      console.log("1- allMentions-1-lastTypedItem-3: ", lastTypedItem, inputData);
    }

    var a = 0;

    if (typeof(lastTypedItem) === 'undefined') {
      console.log("1- allMentions-1-lastTypedItem-5 parent---------------------------------------------------------");
      console.log("1- allMentions-1-lastTypedItem-5 parent-0 set0: ", lastTypedParent?.id, lastTypedItem?.id, a);  
      if (lastTypedParent && typeof(lastTypedParent) !== 'undefined') { //lastTypedParent && lastTypedParent.length > 0

        const parentObject = lastTypedParent?.parent;
        console.log("1- allMentions-1-lastTypedItem-5 parent-0 set ----------------: pt, ptObj: ", lastTypedParent, parentObject);
        if (isSmaller) {    
          //const parentObject = lastTypedParent?.parent.children.id; //lastTypedParent?.parent
        
          console.log("1- allMentions-1-lastTypedItem-5 parent---------------Smaler-------------------------------------");
          console.log("1- allMentions-1-lastTypedItem-5 parent-0 set Smaller: ", lastTypedParent?.id, lastTypedItem?.id, a);
          a = 1;
          //lastTypedItem = lastTypedParent.children.parent.id;
          lastTypedItem = parentObject;
          lastTypedItem = interprets.find(item => item.id === allMentions[allMentions.length -1]);

          setLMention(lastTypedItem?.children);

          console.log("1- allMentions-1-lastTypedItem-5 parent-0 set1: ", lastTypedParent?.id, lastTypedItem?.id, a);
        } else {
          lastTypedItem = interprets.find(item => item.id === allMentions[0]); 
          a = 2;
          console.log("1- allMentions-1-lastTypedItem-5 parent-0 set2 NotSmaller: ", lastTypedParent?.id, lastTypedItem?.id, a);
        }
        //setLTP(prevItem);
      } else {
        //nastane nekdy???
        lastTypedItem = interprets.find(item => item.id === allMentions[0]); 
        a = 3;
        console.log("1- allMentions-1-lastTypedItem-5 parent-0 set3: ", lastTypedParent?.id, lastTypedItem?.id, a);
      }
      //setLTP(prevItem);
      setPrevItem(lastTypedItem);
      //setPrevItem(lastTypedItem);
      //setLTP(lastTypedItem);
    } else {
      //setLTP(lastTypedItem);
      const item = {
        id: lastTypedItem?.id,
        display: lastTypedItem?.display,
        type: lastTypedItem?.type,
        parent: lastTypedParent?.id
      };
      setLTP(item);
    }
    //setLTP(prevItem);
    //LAST PARENT
    //TODO
    console.log("1- allMentions-1-lastTypedItem-4: ", lastTypedItem, interprets, allMentions);
    console.log("1- allMentions-1-lastTypedItem-5: ", lastTypedItem, "parent: ", lastTypedParent, a, "ML: ", isSmaller);

    //const lastTypedItem = data.find(item => item.id === lastMentionId);

    // If there are no mentions, show all top-level items
    if (allMentions.length === 0) {
      data.forEach(item => {
        if (!allMentions.includes(item.id) ) { //&& !insertedItems.includes(item.id) && !blacklist.has(item.type)
          dataArray.push({ id: item.id, display: '.' + item.display, type: item.type });
        }
        if (item.children && item.children.length > 0) {
          setLMention(item.children);
        }
      }); 
      //setLTP(data);
      console.log("1- allMentions blacklist 0: ", blacklist);
    } else { //recursion starts here
      //var c = 0;
      // Find the last typed item in the data
      
      //const lastTypedItem = data.find(item => item.id === lastMentionId); //Tady to nefunguje - undefined
      
      //lastTypedItem = (lastTypedItem === undefined || lastTypedItem.length < 1) ? lastMention : lastTypedItem;
      //lastTypedItem = lastMention !== null ? lastMention : lastTypedItem;
      console.log("1- allMentions has-elm: lastMentionId: ", lastMentionId, ', lastTypedItem: ', lastTypedItem, "lastMention: ", lastMention);
      //lastTypedItem = lastMention.find(item => item.id === lastMentionId);

      // Check if lastTypedItem is not undefined
      
      if (true) { //typeof(lastTypedItem) !== 'undefined' && lastTypedItem !== null
        console.log("1- allMentions x ITEM: ", lastMentionId, ', lastTypedItem: ', lastTypedItem);
        if (typeof(lastTypedItem) !== 'undefined' && lastTypedItem !== null ) { //&& lastTypedItem.children && lastTypedItem.children.length > 0
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
          console.log("1- allMentions-1-lastTypedItem-5 parent1 lastItem:", lastItem);
          if (lastItem && lastItem.children && lastItem !== null && typeof(lastItem) !== 'undefined') { //&& lastItem.children && lastItem.children.length > 0
            console.log("1- allMentions-1-lastTypedItem-5 lastItem:", lastItem.display);
            
            lastItem.children.forEach(item => {
              if (!allMentions.includes(item.id) ) {
                dataArray.push({ id: item.id, display: '.' + item.display, type: item.type, parent: lastItem });
                console.log("1- allMentions-1-lastTypedItem-5 item:", item.display);
              }
            });
          }
        }
        
        if (lastTypedItem && typeof(lastTypedItem) !== 'undefined') { //lastTypedParent && typeof(lastTypedParent) !== 'undefined' && 
          const p = {
            id: lastTypedItem.id,
            display: lastTypedItem.display, //display: '.' + lastTypedItem.display
            type: lastTypedItem.type,
            parent: lastTypedParent.id
          };
          //setLTP(p);  
          //setLTP(lastTypedItem);

          if (!isSmaller) {
            console.log("1- allMentions-1-lastTypedItem-5 parent-2a:", lastTypedParent?.id, lastTypedItem.id);
            iterateChildren(lastTypedItem);
          } else {
            //tady se hleda od zacatku
            console.log("1- allMentions-1-lastTypedItem-5 parent-2aa:", lastTypedParent?.id, lastTypedItem.id, foundItem, allMentions[allMentions.length - 1]);
            if (interprets && interprets.length > 0) {
              interprets.forEach(child => {
                console.log("1- allMentions-1-lastTypedItem-5 parent-2a-child : ", child.display);
                //if (foundItem !== null) return;
                traverseChildren(child);
              });
            }
            //traverseChildren(interprets[0]);
            iterateChildren(foundItem);
            console.log("1- allMentions-1-lastTypedItem-5 parent-2aaa:", lastTypedParent?.id, lastTypedItem.id, foundItem, allMentions[allMentions.length - 1]);
          }
        } else {
          if (lastTypedParent && typeof(lastTypedParent) !== 'undefined') {
            //setLTP(lastTypedParent);
            console.log("1- allMentions-1-lastTypedItem-5 parent-u: :", "ITEM UNDEFINED");
            const p2 = {
              id: lastTypedParent?.id,
              display: lastTypedParent?.display, //display: '.' + lastTypedItem.display
              type: lastTypedParent?.type,
              parent: lastTypedParent?.id
            };
            setLTP(p2);
            if (isSmaller) {
              //console.log("1- allMentions-1-lastTypedItem-5 parent3: :", lastTypedParent);
              console.log("1- allMentions-1-lastTypedItem-5 parent-1a:", lastTypedParent?.id, lastTypedItem?.id);
              //traverseChildren(lastTypedParent);
              if (interprets && interprets.length > 0) {
                interprets.forEach(child => {
                  //if (foundItem !== null) return;
                  traverseChildren(child);
                });
              }
              //traverseChildren(interprets);
              iterateChildren(foundItem);
              console.log("1- allMentions-1-lastTypedItem-5 parent-1aa:", lastTypedParent?.id, lastTypedItem?.id);
            } else {
              console.log("1- allMentions-1-lastTypedItem-5 parent-2b:", lastTypedParent?.id, lastTypedItem?.id);
              iterateChildren(lastTypedItem);
            }
          } else { 
            //nikdy nenastane
            console.log("1- allMentions-1-lastTypedItem-5 parent-u: :", "Parent UNDEFINED");
            if (isSmaller) {
              //console.log("1- allMentions-1-lastTypedItem-5 parent3: :", lastTypedParent);
              console.log("1- allMentions-1-lastTypedItem-5 parent-1b:", lastTypedParent?.id, lastTypedItem?.id);
              //traverseChildren(lastTypedItem); //lastTypedParent
              //traverseChildren(interprets);
              if (interprets && interprets.length > 0) {
                interprets.forEach(child => {
                  //if (foundItem !== null) return;
                  traverseChildren(child);
                });
              }
              iterateChildren(foundItem);
              //setLTP(lastTypedItem);
            } else {
              console.log("1- allMentions-1-lastTypedItem-5 parent-2c:", lastTypedParent?.id, lastTypedItem?.id);
              iterateChildren(lastTypedItem);
              //setLTP(lastTypedParent);
            }
          }
          
        }
        
      } 
    }
    setFilteredArray(dataArray);
    console.log("counter end: ", " ------------end");
    //setLTP(lastTypedItem);
    console.log("\n1- allMentions-1-lastTypedItem-5 pt: ", lastTypedItem);

  }, [allMentions.length, maxLevel]); //allMentions, mentions, data

  const onAddMention = (mention) => {
    //setMentions((prevMentions) => [...prevMentions, mention]);
    setMention(mention);
    //setMentions([...mentions, mention]);
    //setMentions(mentions.concat(mention));
    setMentions((prevMentions) => [...prevMentions, mention.id]);
    //setMentions(prevMentions => [...prevMentions, '.' + mention]);
    //setML(mentionsLength + 1);
    //addType(mention.type);
    writeAllMentions();
    setTrigger("."); 
    console.log("\n--------------ON-ADD-START-----------");
    console.log("setTrigger('.')");
    console.log("mentionAdd: ", mention);
    console.log("get mention: ", getLastMention()); //getLastMention()?.id
    //console.log("type: ", type);
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
        //customSuggestionsContainer={() => {}}
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