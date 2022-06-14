import React from 'react';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import classes from './HomeContent.module.css';
import LinearProgress from '@mui/material/LinearProgress';
import { Box, Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import FileSaver from 'file-saver';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

function Papers() {
    const selectedPaperId = useLocation().state.course._id;
    const [papers, setPapers] = useState([]);
    const [response, setResponse] = useState(false)

    const [loader, setloader] = useState("100%");
    useEffect(() => {
        async function fetchPaper() {
            try {
                const res = await axios.get(`https://papers-pec-backend.herokuapp.com/api/paper/course/${selectedPaperId}`);
                setPapers(res.data)
                setResponse(true)

            }
            catch (ex) {
                console.log(ex);
            }
            setloader("0%")
        }
        fetchPaper()

    }, [selectedPaperId])


    const downloadHandler = (idx) => {
        const attachs = papers[idx]['attachments']
        for (let i in attachs) {
            let attachId = attachs[i]
            axios({
                method: "GET",
                url: `https://pec-papers-backend.herokuapp.com/api/paper/file/download/${attachId}`,
                responseType: "blob"
            })
                .then(response => {
                    FileSaver.saveAs(response.data, `${papers[idx]['paperType']}_${papers[idx]['course']['courseCode']}_${papers[idx]['paperYear']}.pdf`);
                    console.log(response);
                })
                .then(() => {
                    console.log("Completed");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }

    const viewHandler = (idx) => {
        const attachs = papers[idx]['attachments']
        for (let i in attachs) {
            let attachId = attachs[i]
            axios({
                method: "GET",
                url: `https://pec-papers-backend.herokuapp.com/api/paper/file/download/${attachId}`,
                responseType: "blob"
            })
                .then(response => {
                    const file = new Blob([response.data], { type: "application/pdf" });
                    //Build a URL from the file
                    const fileURL = URL.createObjectURL(file);
                    //Open the URL on new Window
                    const pdfWindow = window.open();
                    pdfWindow.location.href = fileURL;
                })
                .then(() => {
                    console.log("Completed");
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }


    let screen = (
        <Box sx={{ display: 'flex' }}>
            <CircularProgress />
            <div>
                LOADING
            </div>
        </Box>
    )
    if (response && papers.length === 0) {
        screen = (
            <div>
                <div className={classes['paperNotFound']} >
                    <div className={classes['paperNotFound__heading']}>
                        No Paper available
                    </div>
                    <div className={classes['paperNotFound__contribute']} >
                        <ArrowUpwardIcon />
                        <div style={{ paddingRight: "20px" }}>
                            Be the first one to contribute !
                        </div>
                    </div>
                </div>
                <div className={classes['paperNotFound__icon']}>
                    <img alt="not found" height={"350px"} src="https://cdn0.iconfinder.com/data/icons/web-development-35/64/404-error-message-server-not-found-512.png" />
                </div>
            </div>
        )
    }

    if (papers.length) {
        screen =
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                {papers.map((paper, idx) => (
                    <Grid item xs={2} sm={4} md={4} key={idx}>
                        <Card sx={{ minWidth: 275 }}>
                            <CardContent sx={{ height: 200 }}>
                                <Typography variant="h6" component="div">
                                    Course Code: {paper.course.courseCode}
                                </Typography>
                                <Typography variant="h7" component="div" sx={{ paddingBottom: 1 }}>
                                    Course Name: {paper.course.courseName}
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Department : {paper.course.department.name}
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Year : {paper.paperYear}
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Semester : {paper.paperSemester}
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Type : {paper.paperType}
                                </Typography>
                                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                    Programme : {paper.paperProgramme}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" onClick={() => viewHandler(idx)}>View</Button>
                                <Button size='small' onClick={() => downloadHandler(idx)}>Download</Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
    }

    return (
        <div>
            <Box width={loader}>
                <LinearProgress />
            </Box>
            <div className={classes['folderHeading']}>
                {screen}
            </div>
        </div >
    )

}

export default Papers;