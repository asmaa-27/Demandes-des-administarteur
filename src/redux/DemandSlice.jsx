import { createSlice ,createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios"

export const fetchDemands=createAsyncThunk('/demand/fetchDemands',async()=>{
    const response=await axios.get('http://localhost:3000/demande');
    return response.data;
});

export const acceptDemand=createAsyncThunk('demand/acceptDemand',async(id)=>{
const response= await axios.put(`http://localhost:3000/demande/${id}`,{status:'Accepted'});
return response.data;
}) 

export const declineDemand=createAsyncThunk('demand/declineDemand',async(id)=>{
    const response= await axios.put(`http://localhost:3000/demande/${id}`,{status:'Declined'});
    return response.data;
    }) 

    const initialState = {
        demands: [],
        loading: false,
        error: null,
      };
const DemandSlice = createSlice(  {
  name:"demand",
  initialState ,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(fetchDemands.pending,(state)=> {
        state.loading=true;
        })
        .addCase(fetchDemands.fulfilled,(state,action)=>{
                state.loading=false;
                state.demands=action.payload
        })
        .addCase(fetchDemands.rejected,(state,action)=>{
                state.loading=false;
                state.error=action.error.message;
        })
        .addCase(acceptDemand.fulfilled, (state, action) => {
                const updatedDemands = state.demands.map((demand) => {
                    if (demand.id === action.payload.id) {
                        return { ...demand,
                                    status: 'Accepted', };
                    }
                return demand;
                });
                state.demands = updatedDemands;
        })
        .addCase(declineDemand.fulfilled, (state, action) => {
                const updatedDemands = state.demands.map((demand) => {
                    if (demand.id === action.payload.id) {
                        return {
                        ...demand,
                        status: 'Declined',
                        };
                    }
                    return demand;
                });
            state.demands = updatedDemands;
        });
}, } )

export default DemandSlice.reducer
