import {
  Body,
  Get,
  Param,
  Res,
  Controller,
  ParseFilePipeBuilder,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { SampleDto } from './dto';
import { SharpPipe } from './sharp.pipe';
import { ApiTags } from '@nestjs/swagger';
import { PATH_IMAGE } from 'src/utils/constants';

@ApiTags('upload')
@Controller('upload')
export class UploadController {
  @UseInterceptors(FileInterceptor('file'))
  @Post('file')
  uploadFile(@UploadedFile(SharpPipe) file: string) {
    return {
      path: PATH_IMAGE + file,
    };
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file/pass-validation')
  uploadFileAndPassValidation(
    @Body() body: SampleDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'json',
        })
        .build({
          fileIsRequired: false,
        }),
      SharpPipe,
    )
    file: string,
  ) {
    return {
      name: body.name,
      file,
      path: PATH_IMAGE + file,
    };
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file/fail-validation')
  uploadFileAndFailValidation(
    @Body() body: SampleDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpg',
        })
        .build(),
      SharpPipe,
    )
    file: string,
  ) {
    return {
      name: body.name,
      file,
      path: PATH_IMAGE + file,
    };
  }

  @Get('file/:path')
  getImage(@Param('path') path: string, @Res() res) {
    return res.sendFile(path, { root: 'uploads' });
  }
}
