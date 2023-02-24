import React, { useEffect , useState , useRef} from "react";
import SockJsClient from 'react-stomp';
import LinearProgress from '@material-ui/core/LinearProgress';
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import Paper from "@material-ui/core/Paper";
const SOCKET_URL = 'https://ep20210201.iptime.org:38765/ws-message';

const Items = ({ setShowPaperAndData }) => {
    const list = [];
    const [listItems, setListItems] = useState(list);
    const [showSearching, setShowSearching] = useState(false);
    const boxRef = useRef(null);

    useEffect(() => {
        setShowSearching(true);
        if (listItems.length > 0) {
            if (listItems[listItems.length - 1].message === "Collection end") {
                setShowSearching(false)
            }
        }
    }, [listItems])

    const onConnected = () => {
        console.log("Connected!!")
    }

    const onMessageReceived = (msg) => {
        console.log(msg.message);
        setListItems(listItems.concat(msg));
    }
    
    const scrollToBottom = () => {
        boxRef?.current?.scrollIntoView({behavior:'smooth'});
    }

    return (
        <div>
            <SockJsClient
                url={SOCKET_URL}
                topics={['/topic/message']}
                onConnect={onConnected}
                onDisconnect={console.log("Disconnected!")}
                onMessage={msg => {scrollToBottom(); onMessageReceived(msg)}}
                debug={false}
            />
            {setShowPaperAndData && (listItems.length == 0 ? false : true) ?
                <>
                    <div style={{ margin: '20px 0px ' }}>
                        {showSearching && <LinearProgress style={{ height: '10px', marginTop: '10px', borderRadius: '5px' }} />}
                    </div>
                    <Paper className="MuiPaper-elevation4" style={{ maxHeight: '260px', overflow: 'auto', marginTop: '25px' }}>
                        <ul style={{ padding: '0px' }}>
                            {listItems.map(listitem => (
                                <li style={{ listStyle: 'none' }}>
                                    <div style={{ height: '25px', display: 'flex', width: '100%', alignItems: 'center', margin: '1px 0px' }}>
                                        <div style={{ height: '20px', width: '3%', textAlign: 'center', margin: '0px 20px 0px 0px' }}><CheckCircleOutlineIcon style={{ color: '#35b803' }} /></div>
                                        {JSON.stringify(listitem)}
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div ref={boxRef} style={{height:'30px'}}/>
                    </Paper>
                </> : ''
            }
        </div>
    );
}

export default Items;