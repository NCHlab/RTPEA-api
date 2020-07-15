# RTPEA-api
RTPEA-api

This server is a API Web Service which is used in conjunction with [RTPEA](https://github.com/NCHlab/RTPEA-api).

This server is running at: https://api.rtpea.com/api


| Endpoint               | Type | Usage                                                                           |
|------------------------|------|---------------------------------------------------------------------------------|
| /api                   | GET  | API Endpoint Homepage                                                           |
| /dbcheck               | GET  | Checks if the database is online                                                |
| /table                 | GET  | Displays all PXD data, stored as a List of Objects                              |
| /select_data           | GET  | Retrieves all State and Tissue Information                                      |
| /newvis                | GET  | Used for ProtVista Visualisation `/newvis/:pxdid/:tissue/:state/:siftScore/`    |
| /visualise_all         | GET  | Retrieves all visualisation info                                                |
| /visualise_config.json | GET  | Config file for ProtVista                                                       |
| /ideogram              | GET  | Chromsome data for the new ideogram `/ideogram/:id`                             |
| /ideogram_loci         | GET  | Chromosome data for the original ideogram `/ideogram_loci/:id`                  |
| /sequence              | GET  | Displays sequence data for selected protein `/sequence/:id`                     |
| /orfnames              | GET  | Retrieves all ORF names in the database                                         |