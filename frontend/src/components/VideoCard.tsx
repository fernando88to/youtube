import Box from "@mui/material/Box";
import {AppBar, Avatar, styled} from "@mui/material";
import {VideoType} from "../types/VideoType";
import Typography from "@mui/material/Typography";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime' // import plugin
import 'dayjs/locale/pt-br'
import theme from "../config/theme";
import Image from "next/image";
import {useRouter} from "next/router";
import Link from "next/link"; // import locale
dayjs.extend(relativeTime);
dayjs.locale('pt-br')

const TypographyCustomizer = styled(Typography)({
    fontWeight: 500,
    /*display:'-webkib-box',
    '-webkit-line-clamp':2,
    '-webkit-box-orient':'vertical',*/
    overflow: 'hidden'

}) as typeof Typography;

const ImageCustomizer = styled(Image)({
    width: '100%'

}) as typeof Image;

interface PropVideoCard {
    item: VideoType
}

export function VideoCard({item}: PropVideoCard) {
    const router = useRouter();
    return (
        <Link href={`/video/${item._id}`} style={{textDecoration:"none"}}>
            <Box display="flex" flexDirection="column" /*onClick={() => {
            router.push({
               pathname:'/video/[id]',
                // @ts-ignore
               query: {id:`${item._id | ''}`}
            });
        }}*/>
                <ImageCustomizer alt={item.title} src={item.thumb}
                                 width={300}
                                 height={200}
                />
                <Box display="flex" mt={1}>
                    <Box>
                        <Avatar alt={item.authorName} src={item.authorAvatar}>
                            SS
                        </Avatar>
                    </Box>
                    <Box>
                        <TypographyCustomizer
                            variant="body1"
                            color="textPrimary">
                            {item.title}
                        </TypographyCustomizer>
                        <Typography display="block" variant="body2" color="textSecondary">
                            {item.authorName}
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            {`${item.views} = ${dayjs(item.updateAt).fromNow()}`}
                        </Typography>
                    </Box>
                </Box>

            </Box>
        </Link>

    );
}