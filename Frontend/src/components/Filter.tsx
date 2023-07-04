import { ChevronDownIcon, ChevronUpIcon } from '@radix-ui/react-icons';
import * as Select from '@radix-ui/react-select';


const Filter = () => {

  return (
    <Select.Root>
      <Select.Trigger
        className="flex items-center justify-between bg-white rounded-full w-36 px-4 py-2"
        aria-label="Filter"
      >
        <Select.Value placeholder="Filtrar..." className='truncate' />
        <Select.Icon className="text-violet11">
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Content className="overflow-hidden bg-white rounded-md shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]">
          <Select.ScrollUpButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <ChevronUpIcon />
          </Select.ScrollUpButton>
          <Select.Viewport className="p-[5px]">
            <Select.Group>
              <Select.Item value='firstSemester' className='hover:bg-gray-700 hover:text-white cursor-pointer hover:border-gray-700'>
                <Select.ItemText className=''>1º Semestre</Select.ItemText>
              </Select.Item>
              <Select.Item value='secondSemester' className='hover:bg-gray-700 hover:text-white cursor-pointer hover:border-gray-700'>
                <Select.ItemText className=''>2º Semestre</Select.ItemText>
              </Select.Item>
              <Select.Item value='thirdSemester' className='hover:bg-gray-700 hover:text-white cursor-pointer hover:border-gray-700'>
                <Select.ItemText className=''>3º Semestre</Select.ItemText>
              </Select.Item>
              <Select.Item value='fourthSemester' className='hover:bg-gray-700 hover:text-white cursor-pointer hover:border-gray-700'>
                <Select.ItemText className=''>4º Semestre</Select.ItemText>
              </Select.Item>
              <Select.Item value='fifthSemester' className='hover:bg-gray-700 hover:text-white cursor-pointer hover:border-gray-700'>
                <Select.ItemText className=''>5º Semestre</Select.ItemText>
              </Select.Item>
              <Select.Item value='sixthSemester' className='hover:bg-gray-700 hover:text-white cursor-pointer hover:border-gray-700'>
                <Select.ItemText className=''>6º Semestre</Select.ItemText>
              </Select.Item>
            </Select.Group>
          </Select.Viewport>
          <Select.ScrollDownButton className="flex items-center justify-center h-[25px] bg-white text-violet11 cursor-default">
            <ChevronDownIcon />
          </Select.ScrollDownButton>
        </Select.Content>
      </Select.Portal>
    </Select.Root>
  )
}

export default Filter;
