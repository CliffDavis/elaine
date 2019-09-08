function LegacyPlusControl(params){var genealogyData=params.GenealogyData;var flowersData=params.FlowersData;
if(genealogyData){SaveGenealogyData();}else{SaveFlowersData();}function SaveGenealogyData(){try{if(genealogyData.SearchData!=null||genealogyData.ResearchObitData!=null){deleteExtraneousKeyValuePairs();
LP.GetGenealogyData(function(data){if(data){if(genealogyData.SearchData){data.SearchData=genealogyData.SearchData;
}else{data.ResearchObitData=genealogyData.ResearchObitData;}var updatedJSON=JSON.stringify(data);
LP.SaveGenealogyData(updatedJSON);}else{var genealogyDataJson=JSON.stringify(genealogyData);
LP.SaveGenealogyData(genealogyDataJson);}});}}catch(e){}}function SaveFlowersData(){var updatedJSON=JSON.stringify(flowersData);
if(updatedJSON){LP.SaveObitFlowersData(updatedJSON);}}function deleteExtraneousKeyValuePairs(){delete genealogyData["KeyValue"];
delete genealogyData["DisplayName"];if(genealogyData.SearchData!=undefined){delete genealogyData["SearchData"]["KeyValue"];
delete genealogyData["SearchData"]["DisplayName"];}if(genealogyData.ResearchObitData!=undefined){delete genealogyData["ResearchObitData"]["KeyValue"];
delete genealogyData["ResearchObitData"]["DisplayName"];}}}