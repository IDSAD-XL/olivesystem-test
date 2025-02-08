import React from 'react';
import { Card } from '@/components/ui/card';
import {
  TableCaption,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from '@/components/ui/table';
import { DomainData, DomainDataResponse } from '@/types/domain-data.dto';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

interface DomainCardProps {
  data: DomainDataResponse;
  isLoading?: boolean;
}

type Cell = {
  key: keyof DomainData;
  label: string;
  className?: string;
};

const TABLE_HEADERS: { [K in keyof DomainData]: Cell } = {
  email: {
    key: 'email',
    label: 'Email',
    className: 'max-w-[300px] text-left truncate',
  },
  ip_address: {
    key: 'ip_address',
    label: 'IP Address',
  },
  username: {
    key: 'username',
    label: 'Username',
  },
  password: {
    key: 'password',
    label: 'Password',
  },
  hashed_password: {
    key: 'hashed_password',
    label: 'Hashed Password',
  },
  name: {
    key: 'name',
    label: 'Name',
  },
  vin: {
    key: 'vin',
    label: 'VIN',
  },
  address: {
    key: 'address',
    label: 'Address',
  },
  phone: {
    key: 'phone',
    label: 'Phone',
  },
  database_name: {
    key: 'database_name',
    label: 'Database Name',
  },
} as const;

const TABLE_HEADERS_MAPPED_ARRAY = Object.entries(TABLE_HEADERS).map(
  ([key, cell]) => ({
    key,
    cell,
  }),
);

const DomainTable: React.FC<DomainCardProps> = ({ data, isLoading }) => {
  return (
    <div>
      <Table
        className={cn('w-full text-left relative', {
          'brightness-50 pointer-events-none': isLoading,
        })}
      >
        <TableCaption>Results</TableCaption>
        <TableHeader>
          <TableRow>
            {TABLE_HEADERS_MAPPED_ARRAY.map((header) => (
              <TableHead
                key={header.key}
                className={cn(
                  'whitespace-nowrap max-w-[500px]',
                  header?.cell?.className,
                )}
              >
                {header.cell.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.entries?.map((entry, index) => (
            <TableRow key={index}>
              {TABLE_HEADERS_MAPPED_ARRAY.map((header) => (
                <TableCell key={header.key} className="max-w-[500px]">
                  {entry[header.key as keyof DomainData] ? (
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger>
                          <p
                            className={cn('text-left', header?.cell?.className)}
                          >
                            {entry[header.key as keyof DomainData]}
                          </p>
                        </TooltipTrigger>
                        <TooltipContent>
                          {entry[header.key as keyof DomainData]}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <div className={cn('flex items-center')}>
                      <Separator orientation={'horizontal'} />
                    </div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DomainTable;
