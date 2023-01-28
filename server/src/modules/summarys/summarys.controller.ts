import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SummarysService } from './summarys.service';
import { CreateSummaryDto } from './dto/create-summary.dto';
import { UpdateSummaryDto } from './dto/update-summary.dto';

@Controller('summarys')
export class SummarysController {
  constructor(private readonly summarysService: SummarysService) {}

  @Post()
  create(@Body() createSummaryDto: CreateSummaryDto) {
    return this.summarysService.create(createSummaryDto);
  }

  @Get()
  findAll() {
    return this.summarysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.summarysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSummaryDto: UpdateSummaryDto) {
    return this.summarysService.update(+id, updateSummaryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.summarysService.remove(+id);
  }
}
