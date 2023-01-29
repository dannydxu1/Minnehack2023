import cheerio from 'cheerio';


const CIVIC_API_URL = 'https://www.googleapis.com/civicinfo/v2/voterinfo';
const GOOGLE_KEY = 'AIzaSyDrTO-ljxa2KihSCvyWa05Y5tezAL_iUVc';

//var letsGo = document.getElementById("letsGo");
//ar address = document.getElementById("textbox");

var letsGo = document.getElementById("demo");
letsGo.addEventListener("click", queryElectionData());
console.log("hello");

function test(){
    var address = document.getElementById("textbox").value;
    document.getElementById("demo").innerHTML = address;
}


export const ActionTypes = {
    GET_ELECTION_DATA: 'GET_ELECTION_DATA',
    GET_ADDRESS: 'GET_ADDRESS',
    SET_ADDRESS: 'SET_ADDRESS',
    GET_RECOMMENDATION: 'GET_RECOMMENDATION',
    SAVE_ELECTION_DATA: 'SAVE_ELECTION_DATA',
    SET_RECOMMENDATIONS: 'SET_RECOMMENDATIONS',
  };


export function queryElectionData(address) {
    const params = {
      key: GOOGLE_KEY,
      address,
      electionId: 2000,
    };
  
    return (dispatch) => {
      CheerioAPI.get(`${CIVIC_API_URL}`, { params }).then((response) => {
        console.log(response);
        dispatch({ type: ActionTypes.GET_ELECTION_DATA, payload: response.data });
      })
        .catch((error) => {
          return error;
        });
        
    };
    
  }


  function ListElections() {
    var civic_service, req, resp;
    CIVIC_API_URL = build("civicinfo", "v2", {
      "developerKey": api_key
    });
    req = CIVIC_API_URL.elections().electionQuery();
    resp = req.execute();
    console.log(json.dumps(resp, {
      "indent": 4
    }));
    CIVIC_API_URL.close();
  }
  
  function voterElectionInfo() {
    var addr, civic_service, req, resp;
    CIVIC_API_URL = build("civicinfo", "v2", {
      "developerKey": api_key
    });
    addr = "19277 Hillcrest Ave Lakevill MN";
    req = CIVIC_API_URL.elections().voterInfoQuery({
      "address": addr,
      "electionId": 2000
    });
    resp = req.execute();
    console.log(json.dumps(resp, {
      "indent": 4
    }));
    CIVIC_API_URL.close();
  }

/*
function voterElectionInfo(){



    civic_service = build('civicinfo', 'v2', developerKey=GOOGLE_KEY);



    addr = '19277 Hillcrest Ave Lakevill MN';

    req = civic_service.elections().voterInfoQuery(address=addr, electionId=2000);

    resp = req.execute();

    print(json.dumps(resp, indent=4));



    civic_service.close();

}
*/