import { useEffect, useMemo, useState } from "react";
import { Mention, MentionsInput } from "react-mentions";
import defaultStyle from "./defaultStyle";
import defaultMentionStyle from "./defaultMentionStyle";
//import JsonDisplay from "./JsonDisplay2.js";
//import AutoComplete from "./AutoComplete.js";
import inputData from "../data/dataSongsMain1v3.js";
//import inputData from "../data/dataSongsMain1.js";


//const data = mockUsers;
//import { convertToHTML } from "draft-convert";
/*
const convertMentionsToHTML = (value, mentions) => {
  const contentState = createValueFromString(value, 'mention', mentions);
  const html = convertToHTML({ styleToHTML: (style) => style });

  return html(contentState);
};
*/
/*
const users = mockUsers;
//const customData = require('../data/mockUsers.json');

const fetchUsers = (query, callback) => {
  if (!query) return;

  setTimeout(() => {
    const filteredUsers = mockUsers.filter((user) =>
      user.display.toLowerCase().includes(query)
    );
    callback(filteredUsers);
  }, 2000);
};

console.log("list", users);
*/

//trigger[zobrazeni](ulozene) --> display, id


/*const interpretId = interprets[0]['id'];
const interpretDisplay = interprets[0]['display'];
const albumId = interprets[2]['album2']['id'];
const albumDisplay = interprets[2]['album2']['display'];
const albumNumber = 2;
const albumDisplay = interprets[albumNumber]['album' + albumNumber]['display'];
const songId = interprets[0]['album1']['song1']['id'];
const songDisplay = interprets[0]['album1']['song1']['display'];
*/
/*
// Define an array to store objects with id and display attributes
const dataArray = [];
// Iterate through the interprets array
interprets.forEach(interpret => {
    // Iterate through each interpret's albums
    Object.values(interpret).forEach(album => {
        // Check if the album is an object
        if (typeof album === 'object' && album !== null) {
            // Iterate through each song in the album
            Object.values(album).forEach(song => {
                // Check if the song is an object and has 'id' and 'display' properties
                if (typeof song === 'object' && song !== null && 'id' in song && 'display' in song) {
                    // Push an object containing id and display attributes to the dataArray
                    dataArray.push({ id: song.id, display: song.display });
                }
            });
        }
    });
});*/
//console.log(dataArray);


const SingleLine = () => {
  //const map = new Map([]);
  const [interprets, setInterprets] = useState([]);
  const [filteredArray, setFilteredArray] = useState([]);
  const [data, setDataSource] = useState([]); //mockUsers
  const [allItems, setAllItems] = useState([]);
  //const [dataArray, setDataArray] = useState([]); 
  const [value, setValue] = useState("");
  const [prevValue, setPrevValue] = useState("");
  const [mentions, setMentions] = useState([]); //all mentions stored here
  //const [type, addType] = useState([]);
  //const [itemTypes, addType] = useState([]);
  //const [mentionsLength, setLength] = useState(0);
  const [inputLength, setInputLength] = useState(0);
  //const [inputText, setInputText] = useState('');
  //const [previousMention, setPreviousMention] = useState();
  const [mention, setMention] = useState(null);
  const [lastMention, setLMention] = useState(null);
  const [mentionTrigger, setTrigger] = useState("@");
  //const [isThereMention, setBool] = useState(false);
  const [mentionsLength, setML] = useState(0);

  console.log("\n---------------------initial START----------------------");
  console.log("trigger(render): ", mentionTrigger);
  //console.log("mentionsLength: ", mentionsLength);

useEffect (() => {
  setInterprets(inputData);
  setDataSource(inputData);
  //console.log("DATA LOAD 1: ", interprets);
}, []);
/*
useEffect (() => {
  console.log("DATA LOAD 1a: ", interprets);
  console.log("inputData: ", inputData);
}, []);
*/
/*
useEffect (() => {
  //setDataSource(interprets); //mockUsers
  //console.log("DATA LOAD 2: ", interprets);
  
  console.log("interpretId:  ", interpretId);
  console.log("interpretDisplay:  ", interpretDisplay);
  console.log("isplay ", albumId);
  console.log("albumDisplay: ", albumDisplay);
  console.log("songId ", songId);
  console.log("songDisplay: ", songDisplay);
  
  //setDataSource( () => [albumId, albumDisplay]);
}, [interprets]);
*/
console.log("\n---------------------initial END----------------------");
/*
useEffect (() => {
  writeAllMentions();
}, );
*/

/*
  const onSelectAutoComplete = (selectedItem) => {
    console.log("Selected item:", selectedItem);
    // Add your logic for handling the selected item
    setSelectedMentions([...selectedMentions, selectedItem]);
  };*/
/*
  useEffect(()=>{
    console.log("Mentions: ", allMentions)
  },[allMentions])
*/

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
    
    // Check if the mention pattern exists in the input
    /*
    if (/.\[[^\]]+\]\([^)]+\)/g.test(input)) {
      // Replace '.' with '@' in the mentions
      input = input.replaceAll(/.\[([^\]]+)\]\(([^)]+)\)/g, '@[$1]($2)');
      console.log("--> replaced by @ :", input);
      //setTrigger('.');
    }
    e.target.value = input;
    //input = "@[Austin123](Austin1)@[album-0](album-0)@[song1Display-1](song-1)";
    // Use regular expression to match mentions in the input string
    const modifiedInput = input.replace(/@\[(.*?)\]\((.*?)\)/g, ".$&");
    console.log("Modified input:", modifiedInput);

    e.target.value = modifiedInput;
    input = modifiedInput;
    */
    //setInputText(input);
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
    if (allMentions.length === 0) {
      mention = {
        id: match[2], // Assuming the id is the content inside the parenthesis
        display: match[1] // Assuming the display name is the content inside the square brackets
      };
      console.log("mention1234: ", mention);
    } else {
      mention = {
        id: match[2],
        display: match[1]
      };
      console.log("mentionTEST: ", mention);
    }
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
    return arr.filter(a => a)
  },[value])
  
  


  useEffect(() => {
    console.log("UseEffect called: ", allMentions);
    setFilteredArray([]);
    var dataArray = [];
    var insertedItems = new Set();
    //var lastId = undefined;
    
    console.log("1- allMentions mentions: ", mentions);
    console.log("1- allMentions: ", allMentions);
    console.log("1- allMentions-1: ", allMentions[allMentions.length - 1]);

    const lastMentionId = allMentions[allMentions.length - 1];
    var lastTypedItem;
    const initMention = allMentions[0];

    if (allMentions && allMentions.length > 0) {
      const res1 = lastMention ? lastMention.find(item => item.id === lastMentionId): null;
      const res2 = data.find(item => item.id === lastMentionId);
      //var lastTypedItem = lastMention ? lastMention.find(item => item.id === lastMentionId) : data.find(item => item.id === lastMentionId);
      lastTypedItem = lastMention ? res1 : res2;
      
      console.log("1- allMentions-1-lastTypedItem-2: ", lastTypedItem, res1, res2, inputData);
    } else {
      //TODO
      const res2 = data;
      //lastTypedItem = inputData.children;
      lastTypedItem = res2;
      console.log("1- allMentions-1-lastTypedItem-3: ", lastTypedItem, inputData);
    }
    if (typeof(lastTypedItem) === 'undefined') lastTypedItem = inputData.find(() => true);
    console.log("1- allMentions-1-lastTypedItem-4: ", lastTypedItem, inputData);

    //const lastTypedItem = data.find(item => item.id === lastMentionId);

    // If there are no mentions, show all top-level items
    if (allMentions.length === 0) {
      data.forEach(item => {
        dataArray.push({ id: item.id, display: '.' + item.display });
        insertedItems.add(item.type);
        if (item.children && item.children.length > 0) {
          setLMention(item.children);
        }
      }); 
      //console.log("1- allMentions Item pushed (1)");
    } else {
      // Find the last typed item in the data
      
      //const lastTypedItem = data.find(item => item.id === lastMentionId); //Tady to nefunguje - undefined
      
      //lastTypedItem = (lastTypedItem === undefined || lastTypedItem.length < 1) ? lastMention : lastTypedItem;
      //lastTypedItem = lastMention !== null ? lastMention : lastTypedItem;
      console.log("1- allMentions has-elm: lastMentionId: ", lastMentionId, ', lastTypedItem: ', lastTypedItem, "lastMention: ", lastMention, ", init: ", initMention);
      //lastTypedItem = lastMention.find(item => item.id === lastMentionId);

      // Check if lastTypedItem is not undefined

      if (typeof(lastTypedItem) !== 'undefined' && lastTypedItem !== null) {  //lastTypedItem !== undefined
        console.log("1- allMentions x ITEM: ", lastMentionId, ', lastTypedItem: ', lastTypedItem);
        if (lastTypedItem.children && lastTypedItem.children.length > 0) {
          //setLMention(lastTypedItem.children);
          if (typeof(lastTypedItem) !== 'undefined' && lastTypedItem !== null) setLMention(lastTypedItem.children);
        }

        // Function to traverse all children of the last typed item and collect them in dataArray
        const traverseChildren = (item) => {
          // Add the current item to dataArray if it hasn't been inserted yet
          if (item && item !== null && item !== 'undefined') {
            if (!allMentions.includes(item.id)) { // && !insertedItems.has(item.type)
              dataArray.push({ id: item.id, display: '.' + item.display });
              insertedItems.add(item.id);
              console.log("1- allMentions -------------------------");
              //console.log("1- allMentions Set: ", insertedItems);
              console.log("1- allMentions add item.id: ", item.id);
              //console.log("1- allMentions Item pushed (2)");
              //console.log("1- allMentions -------------------------");
            } else {
              //console.log("1- allMentions Suspicious-1: ", item.type, item.id);
              if (allMentions.length > 1 && !insertedItems.has(item.id)) {
                //dataArray.push({ id: item.id, display: '.' + item.display });
                //insertedItems.add(item.id);
              }
            }
      
            // Recursively traverse children
            if (item.children && item.children.length > 0) {
              item.children.forEach(child => {
                console.log("1- allMentions x Traverse1(child): ", child);
                traverseChildren(child);
              });
            } else {
              //console.log("1- allMentions Suspicious-2: ", item.type, item.id);
              console.log("1- allMentions: No children", item);
            }
          }
        };
        // Traverse all children of the last typed item and collect them in dataArray
        traverseChildren(lastTypedItem);
      } else {
        console.log("1- allMentions: While loop - allItems, dataArray: ", allItems, dataArray);
        /*
        const traverseChildren2 = (item2) => {
          const item = data.find(item2 => item2.id === data[i]);
          if (item2.children && item2.children.length > 0) {
            item2.children.forEach(child => {
              console.log("1- allMentions x Traverse2(child): ", child);
              traverseChildren2(child);
            });
          }
        }


        var i = 0;
        const len = allMentions.length;
        while ( i < len && (data[i].children && data[i].children.length > 0) && (typeof data[i].children === 'object' && data[i].children !== null) ) {
          const item = data.find(item => item.id === data[i]);
          if (item && item !== null && item !== 'undefined') {
            dataArray.push({ id: item.id, display: '.' + item.display });
          }
          console.log("1- allMentions: While loop - item: ", item);
          i = i + 1;
        }
        */
      }
      
    }
    setFilteredArray(dataArray);
    setAllItems(dataArray);
    
  }, [allMentions.length]); //allMentions, mentions, data

  const onAddMention = (mention) => {
    //setMentions((prevMentions) => [...prevMentions, mention]);
    setMention(mention);
    //setMentions([...mentions, mention]);
    //setMentions(mentions.concat(mention));
    setMentions((prevMentions) => [...prevMentions, mention.id]);
    //setMentions(prevMentions => [...prevMentions, '.' + mention]);
    setML(mentionsLength + 1);
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